from fastapi import APIRouter, BackgroundTasks
from pydantic import BaseModel
from typing import Optional
import requests
import datetime
import html
from app.core.config import settings

router = APIRouter()

class ConsultationLead(BaseModel):
    name: str
    project_type: str
    budget: str
    timeline: str
    contact: str
    additional_info: Optional[str] = None

def send_bot_lead_notification(lead: ConsultationLead):
    if not settings.TELEGRAM_BOT_TOKEN or not settings.TELEGRAM_CHAT_ID:
        print("Telegram configuration missing for Bot Lead")
        return

    try:
        token = settings.TELEGRAM_BOT_TOKEN.strip().strip('"').strip("'")
        chat_id = settings.TELEGRAM_CHAT_ID.strip().strip('"').strip("'")
        
        safe_name = html.escape(lead.name)
        safe_project = html.escape(lead.project_type)
        safe_budget = html.escape(lead.budget)
        safe_timeline = html.escape(lead.timeline)
        safe_contact = html.escape(lead.contact)
        
        msg = (
            f"🤖 <b>New Bot Consultation Lead!</b>\n\n"
            f"👤 <b>Name:</b> {safe_name}\n"
            f"🏗️ <b>Project:</b> {safe_project}\n"
            f"💰 <b>Budget:</b> {safe_budget}\n"
            f"⏳ <b>Timeline:</b> {safe_timeline}\n"
            f"📞 <b>Contact:</b> {safe_contact}\n"
        )
        if lead.additional_info:
            msg += f"\n📝 <b>Note:</b> {html.escape(lead.additional_info)}"
            
        msg += f"\n\n🕒 <b>Time:</b> {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"

        url = f"https://api.telegram.org/bot{token}/sendMessage"
        resp = requests.post(url, json={
            "chat_id": chat_id,
            "text": msg,
            "parse_mode": "HTML"
        }, timeout=10)
        
        print(f"Telegram Bot Lead Response: {resp.status_code} - {resp.text}")
    except Exception as e:
        print(f"Failed to send Telegram bot lead notification: {e}")

@router.post("/consultation")
async def register_consultation(lead: ConsultationLead, background_tasks: BackgroundTasks):
    background_tasks.add_task(send_bot_lead_notification, lead)
    return {"status": "success", "message": "Lead captured successfully"}
