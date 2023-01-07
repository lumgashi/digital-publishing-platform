import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import Article from '../components/Article'
import Header from '../components/Header'
import LatestArticles from '../components/LatestArticles'
import MembershipWidget from '../components/MembershipWidget'
import ProfileWidget from '../components/ProfileWidget'
import SuggestAuthor from '../components/SuggestAuthor'
import Topics from '../components/Topics'
import '../styles/colwidgethidden.css'


const Homepage = () => {
   const { currentUser } = useSelector((state) => state.user);
   return (
      <Container fluid style={{}}>
         <Row>
            {/* main content */}
            <Col sm="12" md="7" lg="8" >
               <Header />
               <Article />
               <Topics />
               <LatestArticles />
            </Col>
            {/* Side content */}
            <Col md="5" lg="4" style={{ borderLeft: '1px solid gray' }} className="col-widget-hidden">
               <ProfileWidget />
               <MembershipWidget />
               <SuggestAuthor />
            </Col>
         </Row>
      </Container>
   )
}

export default Homepage