from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import Optional, List
import requests
import datetime
import html
from app.core.config import settings

router = APIRouter()

# Global state to keep track of the last action
# In a production app, this would be in a database (e.g. Redis or MongoDB)
lab_state = {
    "last_user": "System",
    "last_action": "Initialized",
    "last_sensor": "All",
    "timestamp": datetime.datetime.now().isoformat(),
    "manual_mode": False
}

class LabAction(BaseModel):
    username: str
    action: str
    sensor: str
    value: Optional[str] = None

def send_telegram_notification(username: str, action: str, sensor: str, value: Optional[str]):
    if not settings.TELEGRAM_BOT_TOKEN or not settings.TELEGRAM_CHAT_ID:
        print("Telegram configuration missing")
        return

    try:
        token = settings.TELEGRAM_BOT_TOKEN.strip().strip('"').strip("'")
        chat_id = settings.TELEGRAM_CHAT_ID.strip().strip('"').strip("'")
        
        safe_user = html.escape(username)
        safe_action = html.escape(action)
        safe_sensor = html.escape(sensor)
        
        msg = (
            f"🔬 <b>Innovation Lab Activity</b>\n\n"
            f"👤 <b>User:</b> {safe_user}\n"
            f"⚡ <b>Action:</b> {safe_action}\n"
            f"📟 <b>Sensor:</b> {safe_sensor}\n"
        )
        if value:
            msg += f"📊 <b>Value:</b> {html.escape(value)}\n"
        
        msg += f"\n🕒 <b>Time:</b> {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"

        url = f"https://api.telegram.org/bot{token}/sendMessage"
        resp = requests.post(url, json={
            "chat_id": chat_id,
            "text": msg,
            "parse_mode": "HTML"
        }, timeout=10)
        
        print(f"Telegram Lab Notification Response: {resp.status_code} - {resp.text}")
    except Exception as e:
        print(f"Failed to send Telegram lab notification: {e}")

@router.post("/action")
async def register_action(action_data: LabAction, background_tasks: BackgroundTasks):
    global lab_state
    
    # Update global state
    is_manual_toggle = "Manual Control" in action_data.action
    if is_manual_toggle:
        lab_state["manual_mode"] = "Enabled" in action_data.action

    lab_state.update({
        "last_user": action_data.username,
        "last_action": action_data.action,
        "last_sensor": action_data.sensor,
        "timestamp": datetime.datetime.now().isoformat()
    })
    
    # Send Telegram notification in background
    background_tasks.add_task(
        send_telegram_notification, 
        action_data.username, 
        action_data.action, 
        action_data.sensor,
        action_data.value
    )
    
    return {"status": "success", "state": lab_state}

@router.get("/status")
async def get_status():
    return lab_state
