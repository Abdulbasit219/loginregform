import React, { useState } from 'react';
import './signIn.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PassToggle from "../../components/Eye/PassToggle.jsx";

const signIn = () => {

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const onchange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  const login = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      if (!email || !password) {
        return alert('Please enter Email and Password')
      }
      else if (email && password) {
      const res = await fetch('http://localhost:3000/login', {
        // const res = await fetch('https://mern-logreg-api.vercel.app/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      if (res.status === 200) {
        alert('User successfully logged in');
        navigate('/about');
      }
      else if( res.status === 404 || res.status === 400 ) {
        return alert('Invalid credentials');
      }
    }
    } catch (err) {
      console.log(err);
    }
  }


  const handlePageChange = (e) => {
    e.preventDefault();
    navigate('/signUp');
  }

  const passwordVisility = (e) => {
    e.preventDefault();
    setPasswordVisible(!passwordVisible);
  }

  return (
    <>
      <div className='flex h-screen items-center'>
        <div className='bg-white p-4 rounded shadow-lg w-[90%] md:w-[80%] lg:w-[60%] m-auto flex flex-col-reverse md:flex-row h-auto'>

          <form action="" className='basis-[50%] m-auto'>
            <div className='text-center p-5'>
              <p className='font-bold text-2xl'>Sign In form</p>
            </div>
            <div className='flex flex-col px-10 relative'>

              <div className=''>
                <label htmlFor="" className='text-2xl font-semibold'>Email:</label>
                <input type="text" name="email" onChange={onchange} className='mt-3 border border-1 border-b-black border-x-0 border-t-0 w-[100%] outline-none' placeholder='Enter Email' />
              </div>
              <div className='mt-5'>
                <label htmlFor="" className='text-2xl font-semibold'>Password:</label>
                <input type={passwordVisible ? 'text' : 'password'} name="password" onChange={onchange} className='mt-3 border border-1 border-b-black border-x-0 border-t-0 w-[100%] outline-none' placeholder='Enter Password' />
              </div>

              <div className='absolute right-12 top-32'>
                <PassToggle visible={passwordVisible} onClick={passwordVisility} />
              </div>

            </div>

            <div className='text-center mt-5'>
              <button className='bg-[#437CF8] rounded-lg text-white p-2 font-bold hover:opacity-80' onClick={login}>Sign In</button>
            </div>

            <div className='text-center mt-5'>
              <p>Create a new Account <a href='' className='text-blue-500 hover:underline hover:opacity-50' onClick={handlePageChange}>Sign-up</a></p>
            </div>

          </form>

          <div className='basis-[50%] flex justify-center h-[60vh]'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN0RAfgwE_j9gvK2IU-yWznn7eITxbj0p-YB8YVTwJwGh6J5_HBDpuCyujWfBVzBYJ_70&usqp=CAU" alt="" />
          </div>

        </div>
      </div>
    </>
  )
}

export default signIn