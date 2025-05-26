from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# For debugging CORS issues, allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # <-- Allow all origins temporarily for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

beans = []
shots = []

bean_id_counter = 1
shot_id_counter = 1

class Bean(BaseModel):
    id: Optional[int] = None
    name: str
    roaster: str
    roastDate: Optional[str] = None
    type: str
    notes: Optional[str] = None

class Shot(BaseModel):
    id: Optional[int] = None
    bean_id: int
    date: str
    weight_in: float
    weight_out: float
    time: float
    notes: Optional[str] = None

@app.post("/beans/", response_model=Bean)
def add_bean_with_slash(bean: Bean):
    global bean_id_counter
    bean.id = bean_id_counter
    bean_id_counter += 1
    beans.append(bean)
    return bean

@app.post("/beans", response_model=Bean)
def add_bean_without_slash(bean: Bean):
    return add_bean_with_slash(bean)

@app.get("/beans/", response_model=List[Bean])
def get_beans_with_slash():
    return beans

@app.get("/beans", response_model=List[Bean])
def get_beans_without_slash():
    return beans

@app.delete("/beans/{bean_id}")
def delete_bean(bean_id: int):
    global beans
    beans = [bean for bean in beans if bean.id != bean_id]
    return {"message": f"Bean {bean_id} deleted successfully"}

@app.post("/shots/", response_model=Shot)
def log_shot_with_slash(shot: Shot):
    global shot_id_counter
    shot.id = shot_id_counter
    shot_id_counter += 1
    shots.append(shot)
    return shot

@app.post("/shots", response_model=Shot)
def log_shot_without_slash(shot: Shot):
    return log_shot_with_slash(shot)

@app.get("/shots/{bean_id}", response_model=List[Shot])
def get_shots_for_bean(bean_id: int):
    return [shot for shot in shots if shot.bean_id == bean_id]

@app.get("/shots/", response_model=List[Shot])
def get_all_shots():
    return shots

@app.get("/")
def read_root():
    return {"message": "Coffee Tracker API is running!", "beans_count": len(beans), "shots_count": len(shots)}

@app.get("/beans/{bean_id}", response_model=Bean)
def get_bean(bean_id: int):
    for bean in beans:
        if bean.id == bean_id:
            return bean
    return {"error": "Bean not found"}

@app.put("/beans/{bean_id}", response_model=Bean)
def update_bean(bean_id: int, updated_bean: Bean):
    for i, bean in enumerate(beans):
        if bean.id == bean_id:
            updated_bean.id = bean_id
            beans[i] = updated_bean
            return updated_bean
    return {"error": "Bean not found"}
