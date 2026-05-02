from fastapi import APIRouter, HTTPException, BackgroundTasks, Depends, Request
from slowapi import Limiter
from slowapi.util import get_remote_address
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import List

from app.models.contact import ContactCreate, ContactResponse
from app.core.database import get_database
from app.core.config import settings

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)

@router.post("/", response_model=ContactResponse)
@limiter.limit("3/minute")
async def create_contact(
    request: Request,
    contact: ContactCreate,
    background_tasks: BackgroundTasks,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Create a new contact message"""
    contact_data = {
        **contact.dict(),
        "status": "pending",
        "created_at": datetime.utcnow(),
        "responded_at": None
    }
    
    result = await db.contacts.insert_one(contact_data)
    
    # Send confirmation email in background
    background_tasks.add_task(
        send_contact_confirmation,
        contact.email,
        contact.name,
        contact.subject
    )
    
    # Send notification to admin
    background_tasks.add_task(
        send_admin_notification,
        contact
    )
    
    return ContactResponse(
        id=str(result.inserted_id),
        **contact_data
    )

@router.get("/", response_model=List[ContactResponse])
async def get_contacts(
    skip: int = 0,
    limit: int = 100,
    status: str = None,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get all contact messages (admin only)"""
    query = {}
    if status:
        query["status"] = status
    
    cursor = db.contacts.find(query).skip(skip).limit(limit).sort("created_at", -1)
    contacts = await cursor.to_list(length=limit)
    
    return [
        ContactResponse(
            id=str(contact["_id"]),
            **{k: v for k, v in contact.items() if k != "_id"}
        )
        for contact in contacts
    ]

@router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "contact-api"}

async def send_contact_confirmation(email: str, name: str, subject: str):
    """Send confirmation email to contact"""
    try:
        msg = MIMEMultipart()
        msg["From"] = settings.EMAIL_FROM
        msg["To"] = email
        msg["Subject"] = "Thank you for contacting Anuj Sharma"
        
        body = f"""
        Hi {name},
        
        Thank you for reaching out regarding: {subject}
        
        I have received your message and will get back to you within 24 hours.
        
        Best regards,
        Anuj Sharma
        Senior Full Stack Developer
        """
        
        msg.attach(MIMEText(body, "plain"))
        
        # Only send if SMTP is configured
        if settings.SMTP_HOST and settings.SMTP_USER:
            with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
                server.starttls()
                server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
                server.send_message(msg)
    except Exception as e:
        print(f"Failed to send confirmation email: {e}")

async def send_admin_notification(contact: ContactCreate):
    """Send notification to admin about new contact"""
    # Send Telegram notification if configured
    if settings.TELEGRAM_BOT_TOKEN and settings.TELEGRAM_CHAT_ID:
        try:
            import httpx
            telegram_url = f"https://api.telegram.org/bot{settings.TELEGRAM_BOT_TOKEN}/sendMessage"
            message = (
                f"🚀 *New Portfolio Contact!*\n\n"
                f"👤 *Name:* {contact.name}\n"
                f"📧 *Email:* {contact.email}\n"
                f"📱 *Phone:* {contact.phone or 'N/A'}\n"
                f"🏢 *Company:* {contact.company or 'N/A'}\n"
                f"📝 *Subject:* {contact.subject}\n"
                f"💰 *Budget:* {contact.budget or 'N/A'}\n"
                f"⏳ *Timeline:* {contact.timeline or 'N/A'}\n\n"
                f"💬 *Message:*\n{contact.message}"
            )
            async with httpx.AsyncClient() as client:
                await client.post(telegram_url, json={
                    "chat_id": settings.TELEGRAM_CHAT_ID,
                    "text": message,
                    "parse_mode": "Markdown"
                })
        except Exception as e:
            print(f"Failed to send Telegram notification: {e}")

    try:
        msg = MIMEMultipart()
        msg["From"] = settings.EMAIL_FROM
        msg["To"] = "anujankur13@gmail.com"
        msg["Subject"] = f"New Contact: {contact.subject}"
        
        body = f"""
        New contact form submission:
        
        Name: {contact.name}
        Email: {contact.email}
        Phone: {contact.phone or 'Not provided'}
        Company: {contact.company or 'Not provided'}
        Subject: {contact.subject}
        Message: {contact.message}
        Budget: {contact.budget or 'Not specified'}
        Timeline: {contact.timeline or 'Not specified'}
        
        Timestamp: {datetime.utcnow()}
        """
        
        msg.attach(MIMEText(body, "plain"))
        
        # Only send if SMTP is configured
        if settings.SMTP_HOST and settings.SMTP_USER:
            with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
                server.starttls()
                server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
                server.send_message(msg)
    except Exception as e:
        print(f"Failed to send admin notification: {e}")
