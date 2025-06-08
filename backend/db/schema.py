from sqlmodel import Field, SQLModel
from datetime import date

class Task(SQLModel, table=True):
    id: int = Field( primary_key=True)
    title: str
    description: str | None = Field(default=None)
    due_date: date = Field(default=date.today())
    category: str | None = Field(default=None)