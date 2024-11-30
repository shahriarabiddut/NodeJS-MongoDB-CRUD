import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../provider/AuthProvider'

function Header() {
  const {user,logOut} = useContext(AuthContext);
  // console.log(user);
  const links = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        { !user && <li><NavLink to={'/auth/signin'}>SignIn</NavLink></li> }
        { user && <>  <li><NavLink to={'/dashboard'}>Dashboard</NavLink></li>  
        <li><NavLink to={'/dashboard/addCoffee'}>Add A Coffee</NavLink></li>
                </>
        }
                </>
  return (
    <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow gap-2"
        >
        {links}
      </ul>
    </div>
    <Link to={'/'} className="btn btn-ghost font-rancho text-3xl">Espresso Emporium</Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 gap-2">
    {links}
    </ul>
  </div>
  <div className="navbar-end">
  {
      user ? 
      <div className="flex gap-1">
        <a className="btn bg-[#d18a4b] text-white"> {user?.displayName} </a> 
        <a className="btn" onClick={logOut}> Logout </a> 
      </div>
      : 
      <NavLink to={`/auth/signin`} className="btn">Login</NavLink>
    }
  </div>
</div>
  )
}

export default Header