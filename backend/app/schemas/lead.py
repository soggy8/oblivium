from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class LeadCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    company: str = Field(min_length=2, max_length=160)
    budget: str = Field(min_length=2, max_length=80)
    goals: str = Field(min_length=10, max_length=3000)


class LeadRead(BaseModel):
    id: int
    name: str
    email: EmailStr
    company: str
    budget: str
    goals: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
