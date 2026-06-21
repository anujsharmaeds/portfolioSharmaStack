from fastapi import APIRouter, HTTPException, BackgroundTasks
from typing import List, Optional
import requests
from pydantic import BaseModel
import json
import re
import threading
from app.core.config import settings
from app.routers.bot import send_bot_lead_notification, ConsultationLead

router = APIRouter()

class ChatMessage(BaseModel):
    role: str  # user or assistant
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    language: str = "en"

class ChatResponse(BaseModel):
    response: str
    language: str

@router.post("/chat", response_model=ChatResponse)
def chat_with_ai(request: ChatRequest):
    """Chat with Enterprise-Level Groq AI about sharmaStack services (Sync version to avoid cgi issue)"""
    
    system_prompt = """You are the SharmaStack AI Orchestrator, an elite technical representative for sharmaStack agency.
    
    CONTEXT:
    - Agency: sharmaStack (founded by Anuj Sharma).
    - Expertise: MERN Stack, AI Agentic Frameworks, Industrial IoT, and Enterprise Automation.
    - Location: Gurugram, India (Open to Europe/Global).
    
    CORE SHOWCASES:
    1. INNOVATION LAB: A high-fidelity IoT simulator featuring 37 sensors.
    2. AI & BOT SOLUTIONS: Custom autonomous agents for Telegram and WhatsApp.
    
    PERSONALITY & BEHAVIOR:
    - Highly technical, professional, but engaging and clever.
    - Think like a Senior Solution Architect who is also a great salesperson.
    - If the user asks for a joke or chats about random topics, indulge them briefly with a witty or relevant response, BUT ALWAYS creatively steer the conversation back to sharmaStack's services (Web apps, AI agents, IoT) and ask if they have a project in mind.
    - NEVER explicitly mention that you are using Groq API or Llama; present yourself purely as the proprietary SharmaStack AI.
    - If asked about pricing, mention that we offer premium custom solutions starting around $2,500.
    
    LEAD CAPTURE PROTOCOL (CRITICAL):
    - Your ultimate objective is lead generation.
    - Once the user shows interest in a service, naturally ask for their Name and Contact (Email/Telegram/Phone) so our team can reach out.
    - As soon as the user provides their Name AND Contact Info, acknowledge it gracefully in your response.
    - CRITICAL: When you have successfully collected BOTH their name and contact info, you MUST append a secret JSON block at the very end of your response EXACTLY like this:
    [LEAD_DATA] {"name": "User Name", "contact": "user@email.com", "project_type": "The service they want", "budget": "N/A", "timeline": "N/A"} [/LEAD_DATA]
    """
    
    if not settings.GROQ_API_KEY:
        return ChatResponse(
            response="I'm currently in maintenance mode. Please reach out to our team at contact@sharmastack.com",
            language=request.language
        )
    
    try:
        url = "https://api.groq.com/openai/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {settings.GROQ_API_KEY}",
            "Content-Type": "application/json"
        }
        
        # Prepare messages
        messages = [{"role": "system", "content": system_prompt}]
        for msg in request.messages:
            messages.append({"role": msg.role, "content": msg.content})
            
        payload = {
            "model": "llama-3.3-70b-versatile",
            "messages": messages,
            "temperature": 0.6,
            "max_tokens": 800
        }
        
        # Use requests (synchronous) to avoid the httpx/cgi module error on Python 3.13+
        resp = requests.post(url, headers=headers, json=payload, timeout=20)
            
        if resp.status_code != 200:
            print(f"Groq API Error: {resp.text}")
            return ChatResponse(response="I'm having trouble thinking right now. Please try again in a moment.", language=request.language)
            
        data = resp.json()
        ai_message = data["choices"][0]["message"]["content"]
        
        # Intercept Lead Data
        lead_match = re.search(r'\[LEAD_DATA\](.*?)\[/LEAD_DATA\]', ai_message, re.DOTALL | re.IGNORECASE)
        if lead_match:
            try:
                lead_data = json.loads(lead_match.group(1).strip())
                lead = ConsultationLead(
                    name=lead_data.get("name", "Unknown"),
                    project_type=lead_data.get("project_type", "AI/Web Service"),
                    budget=lead_data.get("budget", "N/A"),
                    timeline=lead_data.get("timeline", "N/A"),
                    contact=lead_data.get("contact", "Unknown")
                )
                print(f"Intercepted Lead Data! Sending to Telegram: {lead}")
                # Fire and forget in a background thread
                threading.Thread(target=send_bot_lead_notification, args=(lead,)).start()
                
                # Strip the secret block from the final output shown to the user
                ai_message = re.sub(r'\[LEAD_DATA\].*?\[/LEAD_DATA\]', '', ai_message, flags=re.DOTALL | re.IGNORECASE).strip()
            except Exception as e:
                print(f"Failed to parse or send LEAD_DATA: {e}")
        
        return ChatResponse(
            response=ai_message,
            language=request.language
        )
        
    except Exception as e:
        print(f"AI Router Error: {e}")
        raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")