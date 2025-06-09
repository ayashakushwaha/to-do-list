import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ToDoApp, { loader as taskListLoader } from './ToDoApp.tsx'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import RootLayout from './RootLayout.tsx'
import TaskForm, { loader as taskLoader } from './components/custom/TaskForm.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: "/", element: <Navigate to="/today" /> },
      {
        path: ":section",
        element: <ToDoApp />,
        loader: taskListLoader,
        children: [
          { path: "tasks/new", element: <TaskForm /> },
          { path: "tasks/:id", element: <TaskForm />, loader: taskLoader }
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)