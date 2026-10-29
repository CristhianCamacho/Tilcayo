from fastapi import FastAPI, status
from pydantic import BaseModel, EmailStr

app = FastAPI(title="Tilcayo Shipping API")

class SignUp(BaseModel):
    name: str
    email: EmailStr
    password: str

class Login(BaseModel):
    email: EmailStr
    password: str

@app.post("/api/register", status_code=status.HTTP_201_CREATED)
async def register(user: SignUp):
    return {
        "message": "Usuario registrado exitosamente",
        "user": {
            "name": user.name,
            "email": user.email
        }
    }

@app.post("/api/login", status_code=status.HTTP_200_OK)
async def login(credentials: Login):
    test_jwt_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.simulacion_token_tilcayo_dev"
    
    return {
        "message": "Inicio de sesión exitoso",
        "access_token": test_jwt_token,
        "token_type": "bearer"
    }
