import React, { useState } from 'react'
import '../styles/navbar.css'
import { ReactComponent as Brand } from '../assets/Logo.svg'
import { ReactComponent as Hamburger } from '../assets/menu.svg'
import Arrow from '../assets/arrow.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setLogout } from '../redux/userSlice'


const Navbar = () => {
   const [showNavbar, setShowNavbar] = useState(false)
   const { currentUser } = useSelector(state => state.user);
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const handleShowNavbar = () => {
      setShowNavbar(!showNavbar)
   }

   const handleLogout = (e) => {
      e.preventDefault();
      dispatch(setLogout());
      navigate('/login')
   }

   return (
      <nav className="navbar">
         <div className="container">
            <div className="logo">
               <Brand />
            </div>
            <div className="menu-icon" onClick={handleShowNavbar}>
               <Hamburger />
            </div>
            <div className={`nav-elements  ${showNavbar && 'active'}`}>
               <ul>
                  <li>
                     <NavLink to="/">Home</NavLink>
                  </li>
                  <li>
                     <NavLink to="/explore">Explore</NavLink>
                  </li>
                  <li>
                     <NavLink to="/membership">Membership</NavLink>
                  </li>
                  {!currentUser && (
                     <>
                        <li>
                           <NavLink to="/login">Login</NavLink>
                        </li>
                        <li>
                           <NavLink to="/signup">Signup</NavLink>
                        </li>
                     </>
                  )}
                  <li>
                     <button className='logout--button' onClick={handleLogout}>
                        Logout{" "}
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                     </button>
                  </li>
               </ul>
            </div>
         </div>
      </nav>
   )
}

export default Navbar