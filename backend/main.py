from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database import SessionLocal, init_db, User

# Инициализируем БД
init_db()

app = FastAPI(title="Backend ERP")

# Разрешаем запросы от фронтенда
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class UserLogin(BaseModel):
    username: str
    password: str

# Поддерживаем оба URL (и /login, и /api/auth/login/)
@app.post("/api/auth/login/")
@app.post("/login")
def login(user_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == user_data.username).first()
    
    if not user or user.password != user_data.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Login yoki parol xato"
        )
    
    # Возвращаем токен `access`, который запрашивает React
    return {
        "access": "fake-jwt-token-admin-session-key",
        "message": "Успешный вход!",
        "user": {
            "id": user.id,
            "username": user.username,
            "role": user.role
        }
    }