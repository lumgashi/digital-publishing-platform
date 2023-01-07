import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Spinner } from 'reactstrap'
import '../styles/auth.css'
import signup_bg from '../assets/signup_bg1.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Loading from '../utils/Loading'
import { useDispatch } from 'react-redux'
import { setLogin } from '../redux/userSlice'

const Login = () => {


   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [error, setError] = useState("")
   const [loading, setLoading] = useState(false);
   const dispatch = useDispatch()

   const navigate = useNavigate()


   const handleSignup = async (e) => {
      e.preventDefault();
      if (!email || !password) {
         setError('Please fill all fields.')
      }

      setLoading(true);
      try {
         const config = {
            headers: {
               "Content-Type": "application/json"
            }
         }

         const { data } = await axios.post('http://localhost:5000/api/users/login',
            {
               email,
               password
            },
            config
         );

         if (data) {
            console.log(data);
            setError("")
            dispatch(setLogin(data))
            setLoading(false);
            console.log(data)
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
                  <h3>Log in to your account</h3>
                  <p>Don't have an account?<Link to='/signup'>{" "}Sign up</Link> </p>

                  <Form style={{ width: '100%' }} onSubmit={handleSignup}>



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
                           <input type="checkbox" />
                           {" "} Remember me for 30 days
                        </label>

                     </div>
                     <p className='singup__section-errors'>{error}</p>

                     <div className='signup__section-input'>
                        {!loading ?
                           (<button className='singup__section-button' type='submit'>Log in</button>)
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
export default Login