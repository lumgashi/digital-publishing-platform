import React from 'react'
import '../styles/membershipwidget.css'
import notebook from '../assets/notebook.svg'
import { Link } from 'react-router-dom'

const MembershipWidget = () => {
   return (
      <section className="membership__section">
         <div className="membership__section-content">
            <h4>Get unlimited acces to<br />everything on DPP </h4>
            <p>Plan starting at less than $1/week</p>
            <Link to='/membership'>
               <button>Get unlimited access</button>
            </Link>
         </div>
         <div className="membership__section-image">
            <img src={notebook} alt="" />
         </div>
      </section>
   )
}

export default MembershipWidget