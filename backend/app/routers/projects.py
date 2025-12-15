from fastapi import APIRouter, HTTPException, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

from app.core.database import get_database
from app.models.projects import Project, ProjectCreate, ProjectUpdate

router = APIRouter()

@router.get("/", response_model=List[Project])
async def get_projects(
    category: Optional[str] = None,
    featured: Optional[bool] = None,
    limit: int = 20,
    skip: int = 0,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get all projects with optional filtering"""
    query = {}
    
    if category:
        query["categories"] = category
    
    if featured is not None:
        query["featured"] = featured
    
    cursor = db.projects.find(query).skip(skip).limit(limit).sort("order", 1)
    projects = await cursor.to_list(length=limit)
    
    return [
        Project(
            id=str(project["_id"]),
            **{k: v for k, v in project.items() if k != "_id"}
        )
        for project in projects
    ]

@router.get("/{project_id}", response_model=Project)
async def get_project(project_id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    """Get a specific project by ID"""
    try:
        project = await db.projects.find_one({"_id": ObjectId(project_id)})
    except:
        raise HTTPException(status_code=400, detail="Invalid project ID")
    
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    return Project(
        id=str(project["_id"]),
        **{k: v for k, v in project.items() if k != "_id"}
    )

@router.get("/categories", response_model=List[str])
async def get_categories(db: AsyncIOMotorDatabase = Depends(get_database)):
    """Get all project categories"""
    categories = await db.projects.distinct("categories")
    return categories

@router.post("/", response_model=Project)
async def create_project(
    project: ProjectCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Create a new project (admin only)"""
    project_data = project.dict()
    project_data["created_at"] = datetime.utcnow()
    project_data["updated_at"] = datetime.utcnow()
    
    result = await db.projects.insert_one(project_data)
    
    return Project(
        id=str(result.inserted_id),
        **project_data
    )

@router.put("/{project_id}", response_model=Project)
async def update_project(
    project_id: str,
    project_update: ProjectUpdate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Update a project (admin only)"""
    try:
        update_data = project_update.dict(exclude_unset=True)
        update_data["updated_at"] = datetime.utcnow()
        
        result = await db.projects.update_one(
            {"_id": ObjectId(project_id)},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Project not found")
        
        updated_project = await db.projects.find_one({"_id": ObjectId(project_id)})
        
        return Project(
            id=str(updated_project["_id"]),
            **{k: v for k, v in updated_project.items() if k != "_id"}
        )
    except:
        raise HTTPException(status_code=400, detail="Invalid project ID")

@router.delete("/{project_id}")
async def delete_project(project_id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    """Delete a project (admin only)"""
    try:
        result = await db.projects.delete_one({"_id": ObjectId(project_id)})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Project not found")
        
        return {"message": "Project deleted successfully"}
    except:
        raise HTTPException(status_code=400, detail="Invalid project ID")