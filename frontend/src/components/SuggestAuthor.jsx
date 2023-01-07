import React, { useState, useEffect } from 'react'
import '../styles/suggesetauthor.css'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const SuggestAuthor = () => {

   const { currentUser } = useSelector((state) => state.user);
   const [suggestedAuthors, setSuggestedAuthors] = useState([])

   const getRandomAuthors = async () => {

      try {
         const config = {
            headers: {
               Authorization: `Bearer ${currentUser.token}`,
            }
         }
         const { data } = await axios.get('http://localhost:5000/api/users/random-author', config);
         setSuggestedAuthors(data)
         console.log(data);
      } catch (error) {
         console.log(error.message)
      }
   }
   useEffect(() => {
      getRandomAuthors();
   }, [])


   return (
      <section className="suggest-author__section">
         <h5>Authors you might be interested</h5>
         {suggestedAuthors.map((auth) => (
            <div className='suggest-author__author' key={auth._id}>
               <div className="suggest-author__image">
                  <img src={auth.profilePhoto} alt="" />
               </div>
               {/* `/profile/${auth}` */}
               <div className="suggest-author__authInfo">
                  <div className='suggest-author__following'>
                     <Link to={`/profile/${auth._id}`}>{auth.name}{" "} {auth.lastName}</Link>
                  </div>
                  <span>{auth.bio}</span>
               </div>
            </div>
         ))}
      </section>
   )
}

export default SuggestAuthor