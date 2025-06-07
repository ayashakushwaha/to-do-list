import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/today" /> },
  { path: '/today', element: <App /> },
  { path: '/upcoming', element: <App /> },
  { path: '/completed', element: <App /> },
  { path: '/settings', element: <App /> }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
