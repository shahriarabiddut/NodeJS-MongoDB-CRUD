import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx';
import './index.css';
import Users from './Users.jsx';
import User from './USer.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/users",
    element: <Users/>,
    loader : () => fetch('http://localhost:3000/users'),
  },
  ,
  {
    path: "/users/:id",
    element: <User/>,
    loader : ({params}) => fetch(`http://localhost:3000/users/${params.id}`),
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
