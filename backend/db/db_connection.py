from typing import Annotated
from fastapi import Depends
from sqlmodel import Session, SQLModel, create_engine

sqlite_file_name = "to-do.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False}
connection = create_engine(sqlite_url, connect_args=connect_args)

def get_session():
    with Session(connection) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]

def create_db_and_tables():
    SQLModel.metadata.create_all(connection)