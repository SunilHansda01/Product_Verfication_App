

from pydantic import BaseModel, Field
from pydantic import EmailStr

from app.core.constants import UserRole

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str = Field(
        min_length=8,
        max_length=50
    )
    role: UserRole

class UserLogin(BaseModel):
    username: str
    password: str