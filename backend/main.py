from typing import Annotated
from datetime import datetime

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import select

from db.db_connection import create_db_and_tables, SessionDep
from db.schema import Task

app = FastAPI()

origins = ["*"]  

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    create_db_and_tables()

# Create a new task
@app.post("/tasks/")
def create_task(task: Task, session: SessionDep) -> Task:
    task.due_date = datetime.strptime(task.due_date, "%Y-%m-%d").date() 
    session.add(task)
    session.commit()
    session.refresh(task)
    return task

# Read all tasks
@app.get("/tasks/")
def read_tasks(
    session: SessionDep,
    before_date: str | None = Query(None),
    after_date: str | None = Query(None),
    due_date: str | None = Query(None),
    completed: bool | None = Query(None)
) -> list[Task]:
    query = select(Task)
    if(before_date):
        before_date_obj = datetime.strptime(before_date,"%Y-%m-%d").date()
        query = query.where(Task.due_date < before_date_obj)
    if(due_date):
        due_date_obj = datetime.strptime(due_date,"%Y-%m-%d").date()
        query = query.where(Task.due_date == due_date_obj)
    if(after_date):
        after_date_obj = datetime.strptime(after_date,"%Y-%m-%d").date()
        query = query.where(Task.due_date > after_date_obj)
    if completed is not None:
        query = query.where(Task.completed == completed)
    tasks = session.exec(query).all()
    return tasks

# Read a specific task by ID
@app.get("/tasks/{task_id}")
def read_task(task_id: int, session: SessionDep) -> Task:
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

# Update a specific task by ID
@app.patch("/tasks/{task_id}")
def update_task(task_id: int, task: Task, session: SessionDep):
    task_db = session.get(Task, task_id)
    if not task_db:
        raise HTTPException(status_code=404, detail="Task not found")
    task_data = task.model_dump(exclude_unset=True)
    if "due_date" in task_data and isinstance(task_data["due_date"], str):
        task_data["due_date"] = datetime.strptime(task_data["due_date"], "%Y-%m-%d").date()
    task_db.sqlmodel_update(task_data)
    session.add(task_db)
    session.commit()
    session.refresh(task_db)
    return task_db

# Delete a specific task by ID
@app.delete("/tasks/{task_id}")
def delete_task(task_id: int, session: SessionDep):
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    session.delete(task)
    session.commit()
    return {"ok": True}


