import React from 'react'
import '../styles/topics.css'
import { Link } from 'react-router-dom'

const tags = [
   "Architecture",
   "Sport",
   "Art",
   "Politics",
   "Life&Culture",
   "News",
   "Design",
   "Technology",
   "Blockchain",
   "Crypto",
   "Health&Care",
   "3D",
   "Money",
   "Programming",
   "Productivity",
   "Science",
   "Internet",
   "eSport",
   "History",
]

const Topics = () => {
   return (
      <section className='topics__article'>
         <h1>Topics Match For You</h1>
         <div className="topics__tags">
            {tags.map((item, index) => (

               <Link to='/category' key={index}>
                  <button className='topics__item'>{item}</button>
               </Link>
            ))}
         </div>
      </section>
   )
}

export default Topics