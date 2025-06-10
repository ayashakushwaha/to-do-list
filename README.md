
# Todo List

A Todo List web application built with React frontend and FastAPI backend.

## 🛠️ Installation & Setup

### Backend Setup (FastAPI)

1.  **Navigate to the backend directory:**
    
    ```bash
    cd backend
    ```
    
2.  **Create a virtual environment (recommended):**
    
    ```bash
    # Windows
    python -m venv venv
    venv\Scripts\activate
    
    # macOS/Linux
    python3 -m venv venv
    source venv/bin/activate
    ```
    
3.  **Install Python dependencies:**
    
    ```bash
    pip install -r requirements.txt
    ```
    
4.  **Run the FastAPI server:**
    
    ```bash
    fastapi dev main.py
    ```
    The backend server will start at `http://localhost:8000`
    

### Frontend Setup (React)

1.  **Navigate to the frontend directory:**
    
    ```bash
    cd frontend
    ```
    
2.  **Install Node.js dependencies:**
    
    ```bash
    npm install
    ```
    
3.  **Start the development server:**
    
    ```bash
    npm run dev    
    ```
    
    The frontend application will start at `http://localhost:5173`

  
 ## 📝 Pages
  <sup>Defined in main.tsx</sup>
   - **`/today`** - List of tasks (both completed/pending) due today.
   - **`/overdue`** - List of pending tasks due before today.
   - **`/upcoming`** - List of all tasks due after today.
   - **`/completed`** - List of all completed tasks.
   - **`/tasks/new`** - Create a new task
   - **`/tasks/{task_id}`** - To view/edit/delete a task
  
## 🔗 API Endpoints

-   **`POST /tasks`** - Create a new task

    ```js
    { 	
    	"title":"<title of your task>", 
    	"description": "<title of your task>", //optional
    	"due_date":"<due date of your task>" //optional, default today
    }
    ```

-   **`GET /tasks`** - Get all tasks
    -   **Query Parameters:**
        -   `completed=true/false` - Filter tasks based on completion status
        -   `due_date=yyyy-mm-dd` - Get tasks with specific due date
        -   `before_date=yyyy-mm-dd` - Get tasks with due date before the provided date
        -   `after_date=yyyy-mm-dd` - Get tasks with due date after the provided date
-   **`GET /tasks/{task_id}`** - Get a specific task by ID
-   **`PATCH /tasks/{task_id}`** - Update an existing task

    ```js
    //only send fields that are being updated
    { 	
        "title":"<title of your task>", 
        "description": "<title of your task>",
        "due_date":"<due date of your task>"
    }
    ```
    
-   **`DELETE /tasks/{task_id}`** - Delete a specific task


## 🌐 Resources
Resources and documentation I referred to for completion of this project.
- **[Learn - FastAPI](https://fastapi.tiangolo.com/learn/)**
- **[Components - shadcn/ui](https://ui.shadcn.com/docs/components)**
- **[Docs - TailwindCSS](https://tailwindcss.com/docs)**