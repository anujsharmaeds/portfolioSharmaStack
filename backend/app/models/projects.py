from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field
from enum import Enum

class ProjectCategory(str, Enum):
    WEB = "web"
    AI = "ai"
    IOT = "iot"
    SCALABLE = "scalable"
    ENTERPRISE = "enterprise"
    ECOMMERCE = "ecommerce"

class ProjectStatus(str, Enum):
    PLANNED = "planned"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    MAINTENANCE = "maintenance"

class Project(BaseModel):
    id: str
    title: str
    description: str
    long_description: str
    technologies: List[str]
    categories: List[ProjectCategory]
    status: ProjectStatus
    featured: bool = False
    order: int = 0
    metrics: str
    image_url: str
    live_url: Optional[str] = None
    code_url: Optional[str] = None
    client: Optional[str] = None
    timeline: Optional[str] = None
    team_size: Optional[str] = None
    results: List[str] = []
    created_at: datetime
    updated_at: datetime

class ProjectCreate(BaseModel):
    title: str = Field(..., min_length=5, max_length=200)
    description: str = Field(..., min_length=10, max_length=500)
    long_description: str = Field(..., min_length=50, max_length=5000)
    technologies: List[str]
    categories: List[ProjectCategory]
    status: ProjectStatus = ProjectStatus.COMPLETED
    featured: bool = False
    order: int = 0
    metrics: str
    image_url: str
    live_url: Optional[str] = None
    code_url: Optional[str] = None
    client: Optional[str] = None
    timeline: Optional[str] = None
    team_size: Optional[str] = None
    results: List[str] = []

class ProjectUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=5, max_length=200)
    description: Optional[str] = Field(None, min_length=10, max_length=500)
    long_description: Optional[str] = Field(None, min_length=50, max_length=5000)
    technologies: Optional[List[str]] = None
    categories: Optional[List[ProjectCategory]] = None
    status: Optional[ProjectStatus] = None
    featured: Optional[bool] = None
    order: Optional[int] = None
    metrics: Optional[str] = None
    image_url: Optional[str] = None
    live_url: Optional[str] = None
    code_url: Optional[str] = None
    client: Optional[str] = None
    timeline: Optional[str] = None
    team_size: Optional[str] = None
    results: Optional[List[str]] = None