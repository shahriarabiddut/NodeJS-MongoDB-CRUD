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
import AuthLayout from './Layouts/AuthLayout.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import AuthProvider from './provider/AuthProvider.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import PrivateLayout from './Layouts/PrivateLayout.jsx';
import Users from './Layouts/Users.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout><App/></HomeLayout>, // Here Need Children props
    loader: ()=>fetch('https://progherocoffee.vercel.app/coffee'),
    errorElement: <ErrorPage/>,
  },
  {
    path:'/auth',
    element: <AuthLayout/>,
    errorElement: <ErrorPage/>,
    children:[
        {
            path:'/auth/',
            element: <SignIn/>
        },
        {
            path:'/auth/signin',
            element: <SignIn/>
        },{
            path:'/auth/signup',
            element: <SignUp/>
        },

    ]
  },{
    path:'/dashboard',
    element: <PrivateLayout/>,
    // errorElement: <ErrorPage/>,
    children:[
        {
            path:'/dashboard/',
            element: <Users/>,
            loader: ()=>fetch('https://progherocoffee.vercel.app/users'),
        },{
          path: "/dashboard/addCoffee",
          element: <AddCoffee/> ,
        },
        {
          path: "/dashboard/updateCoffee/:id",
          element: <UpdateCoffee/>,
          loader: ({params})=>fetch(`https://progherocoffee.vercel.app/coffee/${params.id}`),
        },

    ]
  },
  {
      path:'*',
      element: <ErrorPage/>
  },
    
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
