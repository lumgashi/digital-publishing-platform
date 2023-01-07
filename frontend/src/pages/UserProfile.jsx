import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'


const UserProfile = () => {
   const { id } = useParams();
   const [user, setUser] = useState(null);

   const getUserProfile = async () => {
      try {
         const { data } = await axios.get(`http://localhost:5000/api/users/user-profile/${id}`);
         setUser(data);
         console.log(data);
      } catch (error) {
         console.log(error.message);
      }
   }

   useEffect(() => {
      getUserProfile();
   }, []);


   return (
      <div>{user?.name}</div>
   )
}

export default UserProfile