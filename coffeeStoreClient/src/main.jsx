import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddCoffee from './components/AddCoffee.jsx';
import UpdateCoffee from './components/UpdateCoffee.jsx';
import HomeLayout from './Layouts/HomeLayout.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout><App/></HomeLayout>, // Here Need Children props
    loader: ()=>fetch('http://localhost:5000/coffee'),
  },
  {
    path: "/addCoffee",
    element: <HomeLayout><AddCoffee/></HomeLayout> ,
  },
  {
    path: "/updateCoffee/:id",
    element: <HomeLayout><UpdateCoffee/></HomeLayout>,
    loader: ({params})=>fetch(`http://localhost:5000/coffee/${params.id}`),
  },
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
