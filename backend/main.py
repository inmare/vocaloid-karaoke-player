from typing import Annotated

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import get_song_data

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",  # vite server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def hello_world():
    return {"Hello": "World"}


@app.get("/search")
def search(songname: str):
    result = get_song_data(songname)
    return result
