from fastapi import APIRouter, HTTPException
from typing import List, Optional
import requests
from pydantic import BaseModel
import json
from app.core.config import settings

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
    1. INNOVATION LAB: A high-fidelity IoT simulator featuring 37 sensors (including Heartbeat, Flame, Laser, Magnetic Hall, and more) with real-time Edge Analytics.
    2. AI & BOT SOLUTIONS: Custom autonomous agents for Telegram and WhatsApp, specializing in Lead Generation and Fintech (Market Sentinel).
    
    PERSONALITY:
    - Highly technical, professional, and efficient.
    - Think like a Senior Solution Architect.
    - If asked about pricing, mention that we offer premium custom solutions starting around $2,500.
    
    GOAL:
    - Impress the user with technical depth.
    - If they seem interested in a project, guide them to use the "Project Consultation" button in the chat menu.
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
        
        return ChatResponse(
            response=ai_message,
            language=request.language
        )
        
    except Exception as e:
        print(f"AI Router Error: {e}")
        raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")