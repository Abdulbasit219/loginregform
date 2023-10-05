import React, { useEffect, useState } from 'react';
import './about.css';
import { useNavigate } from 'react-router-dom';


const about = () => {

    const [ userData, setUserData ] = useState();
    const navigate = useNavigate();

    const aboutPage = async () => {
        try{
            // const res = await fetch('http://localhost:3000/about', {
                const res = await fetch('https://login-reg-form-roan.vercel.app/about', {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials:"include"
            });
            const data = await res.json();
            console.log(data.name);

            setUserData(data.name);

            if(!res.status === 200 ){
                const error = new Error(res.error);
                throw error;
            }
        }catch(e){
            console.log(e);
            navigate('/SignIn');
        }
    }

    useEffect( ()=>{
        aboutPage();
    },[] )

     return (
        <div className='flex h-screen items-center'>
            <div className='bg-white p-4 rounded shadow-lg w-[90%] md:w-[80%] lg:w-[60%] m-auto flex flex-col-reverse md:flex-row h-auto'>
                <p>About Us Page {userData} </p>
            </div>
        </div>
    )
}

export default about