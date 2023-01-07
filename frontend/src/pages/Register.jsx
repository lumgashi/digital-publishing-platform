import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Spinner } from 'reactstrap'
import '../styles/auth.css'
import signup_bg from '../assets/signup_bg1.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Loading from '../utils/Loading'






const Register = () => {

   const [name, setName] = useState("")
   const [lastName, setLastname] = useState("")
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [error, setError] = useState("")
   const [isChecked, setIsChecked] = useState(false)
   const [isCheckedError, setIsCheckedError] = useState("")
   const [loading, setLoading] = useState(false);

   const navigate = useNavigate()


   const handleSignup = async (e) => {
      e.preventDefault();
      if (!name || !lastName || !email || !password) {
         setError('Please fill all fields.')
      }

      if (!isChecked) {
         setIsCheckedError('Plase comfirm our Terms & Conditions')
      }

      try {
         setLoading(true);
         const config = {
            headers: {
               "Content-Type": "application/json"
            }
         }

         const { data } = await axios.post('http://localhost:5000/api/users/register', {
            name,
            lastName,
            email,
            password
         }, config);

         if (data) {
            setIsCheckedError("")
            setError("")
            setLoading(false);
            navigate('/')
         }
         setLoading(false);
      } catch (error) {
         setLoading(false);
         setError(error.response.data.error)
         console.log(error.response.data.error)
      }
   }

   if (loading) {
      return <Loading />
   }

   return (
      <Container fluid style={{
         backgroundImage: `url(${signup_bg})`,
         backgroundRepeat: 'no-repeat',
         backgroundSize: 'cover',
         height: '90vh',
      }} >
         <Row>
            <Col
               className="singup__section mt-4"
               md={{
                  offset: 3,
                  size: 6
               }}
               sm="12"
            >

               <section className="signup__section-form">
                  <h3>Signup with your email</h3>
                  <p>Already have an account?<Link to='/login'>{" "}Sign in</Link> </p>

                  <Form style={{ width: '100%' }} onSubmit={handleSignup}>
                     <div className='signup__section-input'>
                        <label>First Name</label>
                        <input type='text' required value={name} onChange={(e) => setName(e.target.value)} />
                     </div>

                     <div className='signup__section-input'>
                        <label>Last Name</label>
                        <input type='text' required value={lastName} onChange={(e) => setLastname(e.target.value)} />
                     </div>

                     <div className='signup__section-input'>
                        <label>Email</label>
                        <input type='email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                     </div>

                     <div className='signup__section-input'>
                        <label>Password</label>
                        <input type='password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                     </div>
                     <div className='signup__section-terms-services '>
                        <label>
                           <input type="checkbox" value={isChecked} onChange={() => setIsChecked(!isChecked)} />
                           {" "} I agree to the <Link to='/terms-of-services'>Terms of Service</Link> and <Link to='/privacy-policy'>Privacy Policy</Link>
                        </label>

                     </div>
                     <p className='singup__section-errors'>{error} {<br />} {isCheckedError}</p>

                     <div className='signup__section-input'>
                        {!loading ?
                           (<button className='singup__section-button' type='submit'>Sign Up</button>)
                           :
                           (
                              <button disabled={loading} className='singup__section-button' type='submit'><Spinner size="">
                                 Loading...
                              </Spinner>
                                 <span>
                                    {' '}Loading
                                 </span></button>
                           )
                        }
                     </div>
                  </Form>
               </section>
            </Col>
         </Row>
      </Container >
   )
}

export default Register