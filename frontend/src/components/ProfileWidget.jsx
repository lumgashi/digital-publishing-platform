import React from 'react'
import '../styles/profilewidget.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const ProfileWidget = () => {
   const { currentUser } = useSelector((state) => state.user);
   return (
      <section className='profile-widget--section'>
         <div className="profile-widget--card">
            <div className="profile-widget--profileImage">
               <img src={currentUser?.profilePhoto} alt="" />
            </div>
            <div className="profile-widget--userInfo">
               <div className="profile-widget--write">
                  <Link to='profile'>{currentUser?.name}{" "} {currentUser?.lastName}</Link>
                  <Link to="/write-post">
                     {currentUser?.role === 'author' && (<button className='profile-widget--button'>
                        <i className="fa-regular fa-pen-to-square"></i>{" "}
                        Write
                     </button>)}

                  </Link>
               </div>
               <p>{currentUser?.role}</p>
            </div>
         </div>
      </section>
   )
}

export default ProfileWidget