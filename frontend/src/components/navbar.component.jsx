import logo from '../imgs/Sparticle_logo 1/png/logo.png'
import { Link } from 'react-router-dom'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='navbar'>
        <Link to='/' className='navbar-logo'>
            <img src={logo} alt='Sparticle Logo' />
        </Link>

        <div className='search-box'>
            <input type="text" placeholder='Search' className='search'/>
            <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-dark-grey text-xl"></i>
        </div>


    </nav>
  )
}

export default Navbar;