import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Details() {
  const {userId} = useParams();
  const [user, setUser] = useState({});


  const  getDetails = async () =>{
    const {data}  = await axios.get(`${import.meta.env.VITE_MURL}/users/${userId}`);
    setUser(data.user);
    console.log(data);
    
  }

  useEffect(() => {
    getDetails();
  }, [])

  console.log(userId);
  return (
    <>
  <h1>User Details</h1>
    <div className='ms-3 mt-5 me-3'>
      <h3>Name is: {user.userName} </h3>
      <h3>Email  is : {user.email} </h3>
      <h3>Phone  is : {user.phone} </h3>
    </div>

    <Link to={'/home'} className='btn btn-outline-danger ms-4 '>Back</Link>
    
    </>
  )
}

export default Details