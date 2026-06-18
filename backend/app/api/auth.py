from fastapi import APIRouter

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


@router.post("/login")
def login():
    return {
        "token": "dummy-token",
        "role": "ADMIN"
    }