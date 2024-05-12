import logo from '../imgs/Sparticle_logo 1/png/logo.png'
import { Link, Outlet } from 'react-router-dom'
import React, { useState } from 'react'

const Navbar = () => {

    const [searchBox, setSearchBox] = useState(false)
  return (
    <div>
        <nav className='navbar'>
            <Link to='/' className='navbar-logo'>
                <img src={logo} alt='Sparticle Logo' />
            </Link>

            <div className={'search-box md:show ' + (searchBox ? "show" : "hide")}>
                <input type="text" placeholder='Search' className='search'/>
                <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-dark-grey text-xl"></i>
            </div>
            <div className='flex items-center gap-3 md:gap-6 ml-auto'>
                <button className='md:hidden w-10 h-10 rounded-full border hover:bg-dark-grey flex items-center justify-center'
                onClick={() => setSearchBox(defaultSet => !defaultSet)}>
                    <i className="fi fi-rr-search text-xl"></i>
                </button>
                <Link to="/write" className='hidden md:flex gap-2 link'>
                    <i className="fi fi-br-file-edit"></i>
                    <p>Write</p>
                
                </Link>
                <Link to="/signin" className='btn-dark py-2'>
                    Sign In
                </Link>
                <Link to="/signup" className='btn-light py-2 hidden md:block'>
                    Sign Up
                </Link>
            </div>
        </nav>

        <Outlet />
        
    </div>
  )
}

export default Navbar;