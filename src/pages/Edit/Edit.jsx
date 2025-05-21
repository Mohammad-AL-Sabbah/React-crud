import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import style from './Edit.module.css'
import { toast } from 'react-toastify'

function Edit() {
  const { register, handleSubmit, setValue } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const { userId } = useParams();
  const navigate = useNavigate();

  const getDetails = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_MURL}/users/${userId}`);
      setValue("userName", data.user.userName);
      setValue("email", data.user.email);
      setValue("phone", data.user.phone);
    } catch (e) {
      if (e.response && e.response.status === 404) {
        setError("User not found");
      } else {
        setError("An error occurred while fetching user data");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDetails();
  }, []);

  const updateForm = async (value) => {
    try {
      const { data } = await axios.put(`${import.meta.env.VITE_MURL}/users/${userId}`, value);
      navigate("/home");
    } catch (e) {
      toast.error("Failed to update user.");
    }
  }

  if (loading) {
    return (
      <div className='w-100 d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
        <span className={style.loader}></span>
      </div>
    );
  }

  if (error) {
    return <h2 className='text-danger text-center'>{error}</h2>;
  }

  return (
    <div className='w-50 m-auto'>
      <h1>Edit User Info</h1>
      <form onSubmit={handleSubmit(updateForm)} className='mt-3'>

        <div className="form-floating mb-3">
          <input {...register("userName")} type="text" className="form-control" id="userName" placeholder="" />
          <label htmlFor="userName">User Name</label>
        </div>

        <div className="form-floating mb-3">
          <input {...register("email")} type="email" className="form-control" id="email" placeholder="" disabled />
          <label htmlFor="email">User Email</label>
        </div>

        <div className="form-floating mb-3">
          <input {...register("phone")} type="text" className="form-control" id="phone" placeholder="" disabled />
          <label htmlFor="phone">User Phone</label>
        </div>

        <button type='submit' className='btn btn-outline-primary'>Update</button>
      </form>
    </div>
  );
}

export default Edit;
