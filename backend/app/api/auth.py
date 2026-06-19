from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db

from app.models.user_model import User

from app.schemas.user import UserCreate
from fastapi.security import OAuth2PasswordRequestForm

from app.core.password import (
    hash_password,
    verify_password
)

from app.core.security import (
    create_access_token
)

from app.core.auth import get_current_user

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    db_user = (
        db.query(User)
        .filter(User.username == form_data.username)
        .first()
    )

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    if not verify_password(
        form_data.password,
        db_user.hashed_password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    access_token = create_access_token(
        {
            "sub": db_user.username,
            "role": db_user.role
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }
    
@router.post("/create-user")
def create_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    existing_user = (
        db.query(User)
        .filter(
            User.username == user.username
        )
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Username already exists"
        )

    db_user = User(
        username=user.username,
        email=user.email,
        role=user.role,
        hashed_password=hash_password(
            user.password
        )
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return {
        "message": "User created successfully",
        "username": db_user.username,
        "role": db_user.role
    }
    
@router.get("/me")
def get_me(
    current_user=Depends(
        get_current_user
    )
):

    return {
        "username": current_user.username,
        "role": current_user.role
    }