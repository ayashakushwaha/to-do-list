from typing import Annotated

from fastapi import FastAPI, HTTPException, Query
from sqlmodel import select

from db.db_connection import create_db_and_tables, SessionDep
from db.schema import Task

app = FastAPI()

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

# Create a new task
@app.post("/tasks/")
def create_task(task: Task, session: SessionDep) -> Task:
    session.add(task)
    session.commit()
    session.refresh(task)
    return task

# Read all tasks
@app.get("/tasks/")
def read_tasks(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
) -> list[Task]:
    heroes = session.exec(select(Task).offset(offset).limit(limit)).all()
    return heroes

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


