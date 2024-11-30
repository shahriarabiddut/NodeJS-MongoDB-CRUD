import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

function AuthLayout() {
  return (<>
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
  )
}

export default AuthLayout