export interface TaskData {
    title: string;
    description?: string;
    due_date?: string;
    category?: string;
    completed?: boolean;
}

export interface Task extends TaskData {
    id: number;
}

// API Base URL
const API_URL = "http://127.0.0.1:8000/tasks";

// Utility function for error handling
const handleResponse = async (response: Response) => {
    if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }
    return response.json();
};

// Add a new task
export const addTask = async (task: TaskData): Promise<void> => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        });
        await handleResponse(response);
        console.log("Task added successfully");
    } catch (error) {
        console.error("Error adding task:", error);
    }
};

// Get all tasks (with optional filtering)
export const getTasks = async (filter?: string): Promise<Task[]> => {
    try {
        const params = new URLSearchParams();
        const todayDate = new Date().toISOString().split("T")[0];

        if (filter?.includes("today")) params.append("due_date", todayDate);
        if (filter?.includes("upcoming")) params.append("after_date", todayDate);
        if (filter?.includes("overdue")) {
            params.append("before_date", todayDate);
            params.append("completed", "false");
        }
        if (filter?.includes("completed")) params.append("completed", "true");

        const url = params.toString() ? `${API_URL}?${params.toString()}` : API_URL;
        const response = await fetch(url);
        console.log(filter,"ok")
        return await handleResponse(response);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return [];
    }
};

// Get a specific task by ID
export const getTaskById = async (id: number): Promise<Task | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        return await handleResponse(response);
    } catch (error) {
        console.error(`Error fetching task with ID ${id}:`, error);
        return null;
    }
};

// Update a task by ID
export const updateTask = async (id: number, updatedTask: Partial<TaskData>): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTask),
        });
        await handleResponse(response);
        console.log("Task updated successfully");
    } catch (error) {
        console.error(`Error updating task with ID ${id}:`, error);
    }
};

// Delete a task by ID
export const deleteTaskById = async (id: number): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });
        await handleResponse(response);
        console.log("Task deleted successfully");
    } catch (error) {
        console.error(`Error deleting task with ID ${id}:`, error);
    }
};