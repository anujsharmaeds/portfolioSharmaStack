from fastapi import APIRouter, HTTPException, BackgroundTasks, Depends, Request, Form, File, UploadFile
from typing import Optional
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
@limiter.limit("10/minute")
async def create_contact(
    request: Request,
    background_tasks: BackgroundTasks,
    db: AsyncIOMotorDatabase = Depends(get_database),
    name: str = Form(...),
    email: str = Form(...),
    subject: str = Form(...),
    message: str = Form(...),
    phone: Optional[str] = Form(None),
    company: Optional[str] = Form(None),
    budget: Optional[str] = Form(None),
    timeline: Optional[str] = Form(None),
    role: Optional[str] = Form(None),
    website: Optional[str] = Form(None),
    linkedin: Optional[str] = Form(None),
    inquiryType: Optional[str] = Form("general"),
    resume: Optional[UploadFile] = File(None)
):
    """Create a new contact message"""
    
    resume_bytes = None
    resume_filename = None
    if resume:
        resume_bytes = await resume.read()
        resume_filename = resume.filename

    contact = ContactCreate(
        name=name,
        email=email,
        subject=subject,
        message=message,
        phone=phone,
        company=company,
        budget=budget,
        timeline=timeline,
        role=role,
        website=website,
        linkedin=linkedin,
        inquiryType=inquiryType
    )

    contact_data = {
        **contact.dict(),
        "status": "pending",
        "created_at": datetime.utcnow(),
        "responded_at": None,
        "has_resume": bool(resume)
    }
    
    result = await db.contacts.insert_one(contact_data)
    
    # Send notification to admin FIRST
    # If the email system hangs (due to Render blocking SMTP), we still get the Telegram message!
    background_tasks.add_task(
        send_admin_notification,
        contact,
        resume_filename,
        resume_bytes
    )

    # Send confirmation email in background
    background_tasks.add_task(
        send_contact_confirmation,
        contact.email,
        contact.name,
        contact.subject
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

def send_contact_confirmation(email: str, name: str, subject: str):
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

def send_admin_notification(contact: ContactCreate, resume_filename: str = None, resume_bytes: bytes = None):
    """Send notification to admin about new contact"""
    # Send Telegram notification if configured
    if settings.TELEGRAM_BOT_TOKEN and settings.TELEGRAM_CHAT_ID:
        try:
            token = settings.TELEGRAM_BOT_TOKEN.strip().strip('"').strip("'")
            chat_id = settings.TELEGRAM_CHAT_ID.strip().strip('"').strip("'")
            telegram_url = f"https://api.telegram.org/bot{token}/sendMessage"
            # Escape HTML characters in user input to prevent parsing errors
            import html
            safe_name = html.escape(contact.name)
            safe_email = html.escape(contact.email)
            safe_subject = html.escape(contact.subject)
            safe_message = html.escape(contact.message)
            
            inquiry_type = getattr(contact, 'inquiryType', 'general')
            
            if inquiry_type == "plan":
                message = (
                    f"🛒 <b>New Plan Selection!</b>\n\n"
                    f"📦 <b>Plan Details:</b> {safe_subject}\n"
                    f"👤 <b>Name:</b> {safe_name}\n"
                    f"📧 <b>Email:</b> {safe_email}\n"
                    f"📱 <b>Phone:</b> {html.escape(contact.phone) if contact.phone else 'N/A'}\n"
                    f"🏢 <b>Company:</b> {html.escape(contact.company) if contact.company else 'N/A'}\n\n"
                    f"💬 <b>Message:</b>\n{safe_message}"
                )
            elif inquiry_type == "project":
                message = (
                    f"💼 <b>New Project Discussion!</b>\n\n"
                    f"👤 <b>Name:</b> {safe_name}\n"
                    f"📧 <b>Email:</b> {safe_email}\n"
                    f"📱 <b>Phone:</b> {html.escape(contact.phone) if contact.phone else 'N/A'}\n"
                    f"🏢 <b>Company:</b> {html.escape(contact.company) if contact.company else 'N/A'}\n"
                    f"💰 <b>Budget:</b> {html.escape(contact.budget) if contact.budget else 'N/A'}\n"
                    f"⏳ <b>Timeline:</b> {html.escape(contact.timeline) if contact.timeline else 'N/A'}\n\n"
                    f"📝 <b>Subject:</b> {safe_subject}\n"
                    f"💬 <b>Message:</b>\n{safe_message}"
                )
            elif inquiry_type == "career":
                message = (
                    f"👔 <b>New Job Application!</b>\n\n"
                    f"👤 <b>Name:</b> {safe_name}\n"
                    f"📧 <b>Email:</b> {safe_email}\n"
                    f"📱 <b>Phone:</b> {html.escape(contact.phone) if contact.phone else 'N/A'}\n"
                    f"🎯 <b>Role/Position:</b> {html.escape(contact.role) if contact.role else 'N/A'}\n"
                    f"🔗 <b>LinkedIn:</b> {html.escape(contact.linkedin) if getattr(contact, 'linkedin', None) else 'N/A'}\n"
                    f"🔗 <b>Portfolio/Link:</b> {html.escape(contact.website) if contact.website else 'N/A'}\n\n"
                    f"📎 <b>Resume Attached:</b> {'Yes' if resume_bytes else 'No'}\n\n"
                    f"📝 <b>Subject:</b> {safe_subject}\n"
                    f"💬 <b>Cover Letter / Message:</b>\n{safe_message}"
                )
            elif inquiry_type == "collaboration":
                message = (
                    f"🤝 <b>Collaboration Request!</b>\n\n"
                    f"👤 <b>Name:</b> {safe_name}\n"
                    f"📧 <b>Email:</b> {safe_email}\n"
                    f"📱 <b>Phone:</b> {html.escape(contact.phone) if contact.phone else 'N/A'}\n"
                    f"🏢 <b>Company/Org:</b> {html.escape(contact.company) if contact.company else 'N/A'}\n"
                    f"🔗 <b>Website/Social:</b> {html.escape(contact.website) if contact.website else 'N/A'}\n\n"
                    f"📝 <b>Subject:</b> {safe_subject}\n"
                    f"💬 <b>Message:</b>\n{safe_message}"
                )
            elif "Newsletter" in safe_subject:
                message = (
                    f"📰 <b>New Newsletter Subscriber!</b>\n\n"
                    f"📧 <b>Email:</b> {safe_email}"
                )
            else:
                message = (
                    f"📬 <b>General Inquiry!</b>\n\n"
                    f"👤 <b>Name:</b> {safe_name}\n"
                    f"📧 <b>Email:</b> {safe_email}\n\n"
                    f"📝 <b>Subject:</b> {safe_subject}\n"
                    f"💬 <b>Message:</b>\n{safe_message}"
                )
            
            import requests
            if resume_bytes and inquiry_type == "career":
                url = f"https://api.telegram.org/bot{token}/sendDocument"
                resp = requests.post(url, data={
                    "chat_id": chat_id,
                    "caption": message,
                    "parse_mode": "HTML"
                }, files={
                    "document": (resume_filename, resume_bytes)
                }, timeout=15)
            else:
                url = f"https://api.telegram.org/bot{token}/sendMessage"
                resp = requests.post(url, json={
                    "chat_id": chat_id,
                    "text": message,
                    "parse_mode": "HTML"
                }, timeout=10)
            
            print(f"Telegram API Response: {resp.status_code} - {resp.text}")
            if resp.status_code != 200:
                print(f"Telegram Error Details: {resp.json()}")
        except Exception as e:
            import traceback
            print(f"CRITICAL: Failed to send Telegram notification: {e}")
            traceback.print_exc()

    try:
        msg = MIMEMultipart("alternative")
        msg["From"] = settings.EMAIL_FROM
        msg["To"] = "contact@sharmastack.com"
        msg["Subject"] = f"New Lead: {inquiry_type.replace('_', ' ').title()} from {safe_name}"
        
        # Format the telegram message into HTML for email
        html_message = message.replace('\n', '<br>')
        html_body = f"""
        <html>
          <body style="font-family: sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
              <h2 style="color: #2563eb; margin-top: 0;">Portfolio Notification</h2>
              <div style="background: #f8fafc; padding: 15px; border-radius: 6px;">
                {html_message}
              </div>
            </div>
          </body>
        </html>
        """
        
        msg.attach(MIMEText(message, "plain"))
        msg.attach(MIMEText(html_body, "html"))
        
        # Attach resume if present
        if resume_bytes and resume_filename:
            from email.mime.application import MIMEApplication
            part = MIMEApplication(resume_bytes, Name=resume_filename)
            part['Content-Disposition'] = f'attachment; filename="{resume_filename}"'
            msg.attach(part)
        
        # Only send if SMTP is configured
        if settings.SMTP_HOST and settings.SMTP_USER:
            with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
                server.starttls()
                server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
                server.send_message(msg)
                print("Admin email notification sent successfully to contact@sharmastack.com")
    except Exception as e:
        print(f"Failed to send admin notification email: {e}")
