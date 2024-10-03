import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider,} from  "react-router-dom";
import "@fontsource/jetbrains-mono"; 
import { AttendancePage } from './attendance-track/pages/attendance-page';
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  }, 
  {
    path: "/attendance",
    element: <AttendancePage/>
  }
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
