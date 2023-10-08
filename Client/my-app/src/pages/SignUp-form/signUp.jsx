import React, { useState } from 'react';
import './signUp.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import  PassToggle  from "../../components/Eye/PassToggle.jsx";

const signUp = () => {

  const [ registeration, setRegisteration ] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: ""
  });

  const [ passwordVisible, setPasswordVisible ] = useState(false);
  const [ confirmPassVisible, setConfirmPassVisible ] = useState(false);

  axios.defaults.withCredentials = true;
  
  const onChange = (e) => {
    const { name, value } = e.target;
    setRegisteration((prevReg) => ({
      ...prevReg,
      [name]: value
    }));
  }

  const navigate = useNavigate();
  const handlePageChange = (e) => {
    e.preventDefault();
    navigate('/SignIn');
  }

  const togglePasswordVisility = (e) => {
    e.preventDefault();
    setPasswordVisible(!passwordVisible);
  }

  const toggleConfirmPassVisibility = (e) => {
    e.preventDefault();
    setConfirmPassVisible(!confirmPassVisible);
  }

  const handleRegisteration = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = registeration;
    try{
    if(!name || !email || !password || !cpassword){
      return alert("All fields are required");
    } 
    else 
    {
      // const postData = await axios.post('http://localhost:3000/register', {
        const postData = await axios.post('https://mern-logreg-api.vercel.app/register', {
        name,
        email,
        password,
        cpassword
      }
      )

      if( postData.status === 200 ){
        alert('Successfully registered');
        navigate('/SignIn')
      }
    }
  }catch (err) {
    if(err.response.status === 422){
      alert("User Already Registered");
    }
    else if(err.response.status === 404){
      alert("password and Confirm Password Does Not Match");
    }
    console.log(err);
  }
  }

  return (
    <>
    <div className='flex h-screen items-center mt-2'>
        <div className='bg-white p-4 rounded shadow-lg w-[90%] md:w-[80%] lg:w-[60%] m-auto flex flex-col md:flex-row h-auto'>

         <div className='basis-[50%] flex justify-center'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN0RAfgwE_j9gvK2IU-yWznn7eITxbj0p-YB8YVTwJwGh6J5_HBDpuCyujWfBVzBYJ_70&usqp=CAU" alt="" />
          </div>

          <form action="" className='basis-[50%] m-auto'>
            <div className='text-center p-5'>
              <p className='font-bold text-2xl'>Sign Up form</p>
            </div>
            <div className='flex flex-col px-10'>
              
              <div className=''>
                <label htmlFor="" className='text-2xl font-semibold'>Name:</label>
                <input type="text" name="name" onChange={onChange} className='mt-3 border border-1 border-b-black border-t-0 border-x-0 w-[100%] outline-none text-xl' placeholder='Enter Text Here'/>
              </div>

              <div className='mt-5'>
                <label htmlFor="" className='text-2xl font-semibold'>Email:</label>
                <input type="text" name="email" onChange={onChange} className='mt-3 border border-1 border-b-black border-t-0 border-x-0 w-[100%] outline-none text-xl' placeholder='Enter Text Here'/>
              </div>
              
              <div className='mt-5 relative'>
                
                <label htmlFor="" className='text-2xl font-semibold'>Password:</label>
                
                <input type={passwordVisible ? 'text' : 'password'} name="password" onChange={onChange} className='mt-3 border border-1 border-b-black 
                border-t-0 border-x-0 w-[100%] outline-none text-xl' placeholder='Enter Text Here'/>
                
                <div className='absolute right-2 top-12'>
                <PassToggle visible={passwordVisible} onClick={togglePasswordVisility}/>
                </div>
              
              </div>
              
              <div className='mt-5 relative'>
              
                <label htmlFor="" className='text-2xl font-semibold'>Confirm          Password:</label>
              
                <input type={confirmPassVisible ? 'text' : 'password'} name="cpassword" onChange={onChange} className='mt-3 border border-1 border-b-black border-t-0 border-x-0 w-[100%] outline-none text-xl' placeholder='Enter Text Here'/>
                
                <div className='absolute right-2 top-12'>
                <PassToggle visible={confirmPassVisible} onClick={toggleConfirmPassVisibility}/>
                </div>

              </div>

            </div>

            <div className='text-center mt-5'>
              <button onClick={handleRegisteration} className='bg-[#437CF8] rounded-lg text-white p-2 font-bold hover:opacity-80'>Sign Up</button>
            </div>

            <div className='text-center mt-5'>
              <p>Already Have An Account <a href="" className='text-blue-500 hover:underline hover:opacity-50' onClick={handlePageChange}>Sign-In</a></p>
            </div>

          </form>

        </div>
      </div>
    </>
  )
}

export default signUp