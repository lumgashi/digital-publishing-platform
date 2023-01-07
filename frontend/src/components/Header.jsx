import React from 'react'
import '../styles/header.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Header = () => {
   const { currentUser } = useSelector((state) => state.user);
   return (
      <section className="header__section">
         <div className="header__section-search">
            <span><i className="fa-solid fa-magnifying-glass"></i></span>
            <input type="text" className="search__input" placeholder="Search for authors or articles ..." />
         </div>
         <div className="header__section-icons">
            <span><i className="fa-regular fa-bell"></i></span>
            <Link to='bookmarks'></Link>
            <span>
               <Link to='bookmarks'><i className="fa-regular fa-bookmark"></i></Link>
            </span>
            <span className='header__section-profile'>
               <Link to='/profile'><img src={currentUser?.profilePhoto} alt="" className='' /></Link>
            </span>
         </div>
      </section>
   )
}

export default Header

{/* <button className="search__button">
                  <svg className="search__icon" aria-hidden="true" viewBox="0 0 24 24">
                     <g>
                        <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                     </g>
                  </svg>
               </button> */}