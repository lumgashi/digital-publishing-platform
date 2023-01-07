import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/article.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import Loading from '../utils/Loading';

const Article = () => {

   const [articleOfTheDay, setArticleOfTheDay] = useState([])
   const [isLoading, setIsLoading] = useState(false);

   const fetchArticleOfTheDay = async () => {
      setIsLoading(true);

      try {
         const { data } = await axios.get('http://localhost:5000/api/posts/article');
         setArticleOfTheDay(data)
         console.log(data);
         setIsLoading(false)
      } catch (error) {
         setIsLoading(false)
         console.log(error.message)
      }
   }
   useEffect(() => {
      fetchArticleOfTheDay();
   }, [])

   // <img src={articleOfTheDay[0]?.postImg} alt="" />
   // <p>{articleOfTheDay[0]?.title}</p>
   if (isLoading) {
      <Loading />
   }

   return (
      <section className="article-of-the-day__section">
         <div className="article-of-the-day__header">
            <h1>Article of the Day</h1>
            <Link to='/articles'><button>View More</button></Link>
         </div>
         {/* to={`/profile/${auth._id}`} */}
         <Link to={`/article/${articleOfTheDay[0]?._id}`}>
            <div className="card 1">
               <div className="card_image"> <img src={articleOfTheDay[0]?.postImg} alt="" /> </div>
               <div className="card_title title-white">
                  <p>
                     {articleOfTheDay[0]?.title}
                     <span>
                        <br />
                        {articleOfTheDay[0]?.shortDescription}
                     </span>
                  </p>

               </div>
            </div>
         </Link>
      </section>
   )
}

export default Article