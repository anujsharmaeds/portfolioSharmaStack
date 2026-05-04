from fastapi import APIRouter, HTTPException
from typing import List
import openai
from pydantic import BaseModel

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
async def chat_with_ai(request: ChatRequest):
    """Chat with AI assistant about portfolio and services"""
    
    system_prompt = """You are sharmaStack, an AI assistant representing a premium software development agency.
    You specialize in MERN stack, Next.js, NestJS, and AI integration.
    You are currently based in Gurugram, Haryana, India but open to relocation to Europe.
    
    You should:
    1. Answer questions about your skills, experience, and projects
    2. Discuss your services and pricing (but don't give exact prices, suggest contact)
    3. Talk about your experience with specific technologies
    4. Discuss your European relocation plans
    5. Be professional but friendly
    6. Always suggest scheduling a call for detailed discussions
    
    Keep responses concise and helpful."""
    
    if not settings.OPENAI_API_KEY:
        return ChatResponse(
            response="I'm currently unavailable. Please contact me directly at contact@sharmastack.com",
            language=request.language
        )
    
    try:
        openai.api_key = settings.OPENAI_API_KEY
        
        messages = [
            {"role": "system", "content": system_prompt}
        ] + [msg.dict() for msg in request.messages]
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            temperature=0.7,
            max_tokens=500
        )
        
        return ChatResponse(
            response=response.choices[0].message.content,
            language=request.language
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")

@router.get("/languages")
async def get_supported_languages():
    """Get list of supported languages for chat"""
    return {
        "languages": [
            {"code": "en", "name": "English"},
            {"code": "de", "name": "Deutsch"},
            {"code": "fr", "name": "Français"},
            {"code": "es", "name": "Español"},
        ]
    }