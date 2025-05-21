import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import style from './Home.module.css'
import { Link } from 'react-router-dom'
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Home() {
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  



  const getUsers = async () =>{
    try{
    const {data} = await axios.get(`${import.meta.env.VITE_MURL}/users`);
    setUsers(data.users);

    }catch(e){
  console.log(e);
  if (e.response && e.response.status === 404) {
    setError("page not found");
  } else {
    setError("page not found");
  }
}finally{
  setLoading(false);
}
  }



  const deletUser = async (id) => {
   
      const {data} = await axios.delete(`${import.meta.env.VITE_MURL}/users/${id}`);
      console.log(data)
        toast.success('User deleted succsesfully', {
position: "top-right",
autoClose: 2000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition: Bounce,
});
      
      setUsers(users.filter((user) => user._id !== id));
      }



  useEffect(() => {
    getUsers();
  },[])

if(loading){
  return <>
<div className={`${style.loading_cont}w-100 d-flex justify-content-center align-items-center `} >
<span class={style.loader}></span>

</div>

  </>
}
if(error){
  return <>
    <h2 className='text-danger'>{error}</h2>

  </>
}


  return (
    <>
    <div className=' w-75 m-auto'>
      
    <h2 className='text-center mb-3'>Users List</h2>

      <div>
        <table className="table table-striped table-bordered ">
          <thead className='text-center'>
            <tr>
            <th>id</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Action</th>
            </tr>    
          </thead>
          <tbody className='text-center'>
            {users.map((user) => (
              <tr key={user._id}>
                <td> {user._id}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td className='gap-2 d-flex justify-content-center align-items-center'>
                  <Link to={`/details/${user._id}`} className='btn btn-outline-primary'>Details</Link>
                  <button onClick={()=>deletUser(user._id)} className='btn btn-outline-danger'>Delete</button>
                  <Link to={`/edit/${user._id}`} className='btn btn-outline-info'>Edite</Link>


                </td>



              </tr>
            ))}

          </tbody>
        </table>
      </div>
      

    </div>

    </>
  )
}

export default Home