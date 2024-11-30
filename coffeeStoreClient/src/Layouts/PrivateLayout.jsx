import React, { useContext } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { AuthContext } from '../provider/AuthProvider'
import Loading from '../pages/Loading'

function PrivateLayout() {
  const {user,loading} = useContext(AuthContext);
  const location = useLocation();
  console.log(location.pathname);
  if(loading){
    return <Loading></Loading>
  }
  return (<>
        { user ?
        <>
            <section>
            <div className='mx-auto w-10/12'><header><Header/></header></div>
            </section>
            <section>
            <main className='mx-auto w-10/12 min-h-screen'><section className=''><Outlet/></section> </main>
            </section>
            <section className='bg-neutral'>
            <div className='mx-auto w-10/12'><Footer/></div>
            </section>
        </>
        :
        <Navigate state={location.pathname} to={'/auth/signin'}>  
        </Navigate>
        }
        </>
  )
}

export default PrivateLayout