import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Alert, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { updateProfile } from '../redux/userSlice';
import '../styles/profile.css'

const Profile = () => {

   const { currentUser } = useSelector(state => state.user);
   const [modal, setModal] = useState(false);
   const [name, setName] = useState(currentUser?.name)
   const [lastName, setLastName] = useState(currentUser?.lastName)
   // const [email, setEmail] = useState(currentUser?.email)
   const [bio, setBio] = useState(currentUser?.bio)
   // const [password, setPassword] = useState(currentUser?.password)
   const [image, setImage] = useState(currentUser?.profilePhoto)
   const [error, setError] = useState("")
   const [loading, setLoading] = useState(false)
   const [picLoading, setPicLoading] = useState(false);
   const dispatch = useDispatch()

   const postDetails = (pics) => {
      setPicLoading(true);
      // if (pics === undefined) {
      //    <Alert color="light">
      //       This is a primary alert — check it out!
      //    </Alert>
      // }
      //console.log(pics);
      if (pics.type === "image/jpeg" || pics.type === "image/png") {
         const data = new FormData();
         data.append("file", pics);
         data.append("upload_preset", "iChat-mern");
         data.append("cloud_name", "dxmddtyga");
         fetch("https://api.cloudinary.com/v1_1/dxmddtyga/image/upload", {
            method: "post",
            body: data,
         })
            .then((res) => res.json())
            .then((data) => {
               setImage(data.url.toString());
               console.log(data.url.toString());
               setPicLoading(false);
            })
            .catch((err) => {
               console.log(err);
               setPicLoading(false);
            });
      } else {
         <Alert color="light">
            Please select a valid image format, jpeg or png
         </Alert>
         setPicLoading(false);
         return;
      }
   };


   const handleUpdateProfile = async (e) => {
      e.preventDefault();
      console.log('ok')
      setLoading(true);
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${currentUser?.token}`,
            }
         }

         const { data } = await axios.put('http://localhost:5000/api/users/update-user',
            {
               name,
               lastName,
               // email,
               // password,
               bio,
               profilePhoto: image,
            },
            config
         );

         if (data) {
            console.log(data);
            setError("")
            dispatch(updateProfile(data))
            setLoading(false);
            setModal(false);
            // navigate('/')
         }
         setLoading(false);
      } catch (error) {
         setLoading(false);
         console.log(error)
      }
   }


   const toggle = () => setModal(!modal);

   return (
      <Container fluid>
         <Row>
            <Col sm="12" md="12" lg="12" className='profile__col'>
               <section className='profile__section'>
                  <div className="profile__img">
                     <img src={currentUser?.profilePhoto} alt="" />
                  </div>
                  <div className="profile__info">
                     <span><i>{currentUser?.bio}</i></span>
                     <div className='profile__name'>
                        <h3>{currentUser?.name}{" "}{currentUser?.lastName}</h3>
                        <button onClick={toggle}>Update Profile</button>
                        <Modal isOpen={modal} toggle={toggle}>
                           <ModalHeader className='profile__modal' toggle={toggle}>Update Profile</ModalHeader>
                           <ModalBody>
                              <Form className='profile__form' onSubmit={handleUpdateProfile}>
                                 {/* firstname */}
                                 <FormGroup>
                                    <Label for="">
                                       First Name
                                    </Label>
                                    <Input

                                       placeholder="First name"
                                       type="text"
                                       value={name}
                                       onChange={(e) => setName(e.target.value)}
                                    />
                                 </FormGroup>
                                 {/* lastname */}
                                 <FormGroup>
                                    <Label for="">
                                       Last Name
                                    </Label>
                                    <Input

                                       placeholder="Last name"
                                       type="text"
                                       value={lastName}
                                       onChange={(e) => setLastName(e.target.value)}
                                    />
                                 </FormGroup>
                                 {/* email */}
                                 {/* <FormGroup>
                                    <Label for="">
                                       Email
                                    </Label>
                                    <Input

                                       placeholder="Email"
                                       type="email"
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                                    />
                                 </FormGroup> */}
                                 {/* password */}
                                 {/* <FormGroup>
                                    <Label for="examplePassword">
                                       Password
                                    </Label>
                                    <Input

                                       placeholder="Password"
                                       type="password"
                                       value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                                    />
                                 </FormGroup> */}
                                 {/* bio */}
                                 <FormGroup>
                                    <Label for="">
                                       Bio
                                    </Label>
                                    <Input

                                       placeholder="Bio"
                                       type="text"
                                       value={bio}
                                       onChange={(e) => setBio(e.target.value)}
                                    />
                                 </FormGroup>
                                 {/* profile pic */}
                                 <FormGroup>
                                    <Label for="exampleFile">
                                       Upload Profile Picture
                                    </Label>
                                    <Input
                                       placeholder='Set Your Profile Image'
                                       type="file"
                                       accept='image/*'
                                       onChange={(e) => postDetails(e.target.files[0])}
                                    />

                                 </FormGroup>

                              </Form>
                           </ModalBody>
                           <ModalFooter>
                              <button className='profile__submit-button' onClick={handleUpdateProfile}>
                                 Update Profile
                              </button>{' '}
                              <Button color="secondary" onClick={toggle}>
                                 Cancel
                              </Button>
                           </ModalFooter>
                        </Modal>
                     </div>
                     <span>
                        {currentUser?.publishedPosts}
                        {" "} Publications •{" "}
                        {currentUser?.followers.length}{" "} Followers •{" "}
                        {currentUser?.following.length}{" "} Following
                     </span>
                  </div>
               </section>
            </Col>
         </Row>
      </Container>
   )
}

export default Profile