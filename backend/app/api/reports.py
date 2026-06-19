from datetime import date

from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.verification_log import VerificationLog

from app.core.dependencies import admin_required
from app.models.user_model import User

router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)


@router.get("/")
def get_report(
    start_date: date,
    end_date: date,
    current_user: User = Depends(admin_required),
    db: Session = Depends(get_db)
):

    data = (
        db.query(VerificationLog)
        .filter(
            VerificationLog.verified_at >= start_date,
            VerificationLog.verified_at <= end_date
        )
        .all()
    )

    return {
        "generated_by": current_user.username,
        "total_records": len(data),
        "data": data
    }