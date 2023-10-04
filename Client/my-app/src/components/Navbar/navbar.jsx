import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';
import { FaBars } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';

const navbar = () => {

  const navigate = useNavigate();
  
  const [ isMobile, setIsMobile ] = useState(false);
  const toggleMobile = () => {
    setIsMobile(!isMobile);
  }

  return (
    <>
      <div className='bg-white sticky md:flex text-xl font-semibold'>
        <div className='basis-[60%] ml-4 p-4'>&lt; Abdul Basit /&gt;</div>
          <div className={isMobile ? 'navlink-Mobile' : 'navlink basis-[40%]'}>
          
          <p className='ml-4 p-4 cursor-pointer hover:opacity-50' onClick={(e) => {
            e.preventDefault();
            e.preventDefault();
            navigate('/');
          }}>Home</p>
          
          <p className='ml-4 p-4 cursor-pointer hover:opacity-50' onClick={(e) => {
            e.preventDefault();
            navigate('/about');
          }}>About</p>

          <p className='ml-4 p-4 cursor-pointer hover:opacity-50' onClick={(e) => {
            e.preventDefault();
            navigate('/signIn');
          }}>Login</p>
          
          <p className='ml-4 p-4 cursor-pointer hover:opacity-50' onClick={(e) => {
            e.preventDefault();
            navigate('/signUp');
          }}>Registeration</p>
        
        </div>
          
        <button className='menu-bar-icon' onClick={toggleMobile}>
          {isMobile ? <ImCross/> : <FaBars/>}
        </button>
       
      </div>
    </>
  )
}

export default navbar