from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field
from enum import Enum

class ContactStatus(str, Enum):
    PENDING = "pending"
    RESPONDED = "responded"
    ARCHIVED = "archived"

class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=5, max_length=200)
    message: str = Field(..., min_length=10, max_length=5000)
    phone: Optional[str] = None
    company: Optional[str] = None
    budget: Optional[str] = None
    timeline: Optional[str] = None
    inquiryType: Optional[str] = "general"

class ContactResponse(BaseModel):
    id: str
    name: str
    email: str
    subject: str
    message: str
    status: ContactStatus
    created_at: datetime
    responded_at: Optional[datetime]

    class Config:
        from_attributes = True

class NewsletterSubscribe(BaseModel):
    email: EmailStr
    name: Optional[str] = None
    interests: list[str] = []

class AnalyticsEvent(BaseModel):
    event_type: str
    page_url: str
    user_agent: str
    ip_address: str
    referrer: Optional[str] = None
    metadata: dict = {}
