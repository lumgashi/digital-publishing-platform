import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Col, Row, Container } from 'reactstrap';
import '../styles/latestarticle.css'

const LatestArticles = () => {

   const [articles, setArticles] = useState([]);

   const fetchLatestArticles = async () => {
      try {
         const { data } = await axios.get('http://localhost:5000/api/posts/latest-article');
         console.log(data);
         setArticles(data);
      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      fetchLatestArticles();
   }, [])

   return (
      <section className='latest-article__section'>
         <Container fluid>
            <Row>
               {
                  articles.map((article) => (
                     <Col sm={12} md={6} lg={6} key={article._id}>
                        <Link to={`/article/${article?._id}`} key={article._id}>
                           <div className="latest-article__card">
                              <div className="latest-article__img">
                                 <img src={article.postImg} alt="" />
                              </div>
                              <div className="latest-article__info">
                                 <h5>{article.title}</h5>
                                 <p>{article.shortDescription}</p>
                                 <div className="latest-article__info-user">
                                    <img src={article.author.profilePhoto} alt="" />
                                    <span>{" "}By{" "}
                                       <span className='latest-article__user-name'>{article.author.name}{" "}{article.author.lastName} </span>
                                       • {article.minutesToRead}{" "} min read
                                    </span>
                                 </div>
                              </div>
                           </div>
                        </Link>
                     </Col>
                  ))
               }
            </Row>
         </Container>
      </section>
   )
}

export default LatestArticles