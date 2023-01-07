import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import axios from 'axios'
import '../styles/articlepage.css'
import 'animate.css';

const ArticlePage = () => {

   const { id } = useParams();
   const navigate = useNavigate();


   const [post, setPost] = useState(null);

   const getUserProfile = async () => {
      try {
         const { data } = await axios.get(`http://localhost:5000/api/posts/${id}`);
         setPost(data);
         console.log(data);
      } catch (error) {
         console.log(error.message);
      }
   }

   const bookmarkPost = async () => {
      try {

      } catch (error) {

      }
   }

   const goOnePageBack = () => {
      //By calling navigate(-1);the page will redirect to the previous page. Similarly, If we want to go back  
      // to more than one page, replace -1 with -2, -3, etc.
      navigate(-1);
   }

   useEffect(() => {
      getUserProfile();
      window.scrollTo(0, 0);
   }, []);


   return (
      <Container fluid className='page-post__container' >
         <Row>
            <Col lg={12} md={12} sm={12}>
               <div className="page-post__header">
                  <div className='page-post__author'>
                     <button className='page-post__go-back animate__pulse' onClick={goOnePageBack}>
                        <span><i className="fa-solid fa-arrow-left-long"></i></span>
                     </button>
                     <h5>Story by {" "} {post?.author.name}{" "}{post?.author.lastName} </h5>
                  </div>

                  <div>
                     <button className='page-post__bookmark' onClick={bookmarkPost}>
                        Save
                     </button>
                  </div>
               </div>
            </Col>
         </Row>

         <section className="page-post__image animate__animated animate__backInUp">
            <img src={post?.postImg} alt="" />
         </section>

         <section className="page-post__body-container">
            <div className="page-post__body-post">
               <h1>{post?.title}</h1>
               <p>{post?.body}</p>
            </div>
         </section>
      </Container>
   )
}

export default ArticlePage