from fastapi import Depends
from fastapi import HTTPException

from app.core.auth import get_current_user
from app.core.constants import UserRole
from app.models.user_model import User


def admin_required(
    current_user: User = Depends(get_current_user)
):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(
            status_code=403,
            detail="Admin access required"
        )

    return current_user


def operator_required(
    current_user: User = Depends(get_current_user)
):
    if current_user.role != UserRole.OPERATOR:
        raise HTTPException(
            status_code=403,
            detail="Operator access required"
        )

    return current_user