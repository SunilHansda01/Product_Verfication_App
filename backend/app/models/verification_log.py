from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import DateTime
from sqlalchemy.sql import func

from app.db.database import Base


class VerificationLog(Base):
    __tablename__ = "verification_logs"

    id = Column(Integer, primary_key=True)

    wid = Column(String)

    operator = Column(String)

    image_path = Column(String)

    verified_at = Column(
        DateTime,
        server_default=func.now()
    )