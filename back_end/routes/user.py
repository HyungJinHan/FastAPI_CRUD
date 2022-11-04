from fastapi import APIRouter
from schemas.user import User
from models.user import users
from config.db import conn

user = APIRouter()

@user.get('/')
async def fetch_users():
  return conn.execute(users.select()).fetchall()

@user.get('/{id}')
async def fetch_user(id: int):
  return conn.execute(user.select().where(users.c.id == id)).first()
  
@user.post('/')
async def create_user(user: User):
  conn.execute(users.insert().values(
    name=user.name,
    email=user.email,
    password=user.password
  ))
  return conn.execute(users.select()).fetchall()

@user.put('/{id}')
async def update_user(id: int, user: User):
  conn.execute(users.update().values(
    name=user.name,
    email=user.email,
    password=user.password
  ).where(users.c.id == id))
  return conn.execute(users.select()).fetchall()

@user.delete('/{id}')
async def delete_user(id: int):
  conn.execute(user.delete().where(users.c.id == id))
  return conn.execute(users.select()).fetchall()