import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Create() {
  const {register , handleSubmit} = useForm();
  const navigate = useNavigate();
  const registerForm = async (data) => {
    const response = await axios.post(`${import.meta.env.VITE_MURL}/users`,data);
    if(response.status === 201){
      toast.success('User Create Succesfully', {
position: "top-right",
autoClose: 3000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition: Bounce,
});
      navigate("/home");
      }


    console.log(response);

  }
  return (
    <>
    <div className=' w-50 m-auto'>
      <h2  className='w-25 m-auto'>Create User</h2>
      <form onSubmit={handleSubmit(registerForm)}  className='mt-3'>

             <div className="form-floating mb-3">
            <input {...register("userName")}  type="text" className="form-control" id="floatingInput" placeholder="" />
            <label htmlFor="floatingInput">User Name</label>
          </div>

               <div className="form-floating mb-3">
            <input {...register("email")}  type="email" className="form-control" id="floatingInput" placeholder="" />
            <label htmlFor="floatingInput">User Email</label>
          </div>

               <div className="form-floating mb-3">
            <input {...register("password")}  type="password" className="form-control" id="floatingInput" placeholder="" />
            <label htmlFor="floatingInput">Password</label>
          </div>

               <div className="form-floating mb-3">
            <input {...register("phone")}  type="text" className="form-control" id="floatingInput" placeholder="" />
            <label htmlFor="floatingInput">User Phone</label>
          </div>



<div className='w-100 d-flex justify-content-center gap-3'>
            <Link to={'/home'} className='btn btn-outline-danger'>Back</Link>
          <button type='submit' className='btn btn-outline-primary'>Register</button>
</div>
      </form>
    </div>
    
    
    
    
    </>
  )
}

export default Create