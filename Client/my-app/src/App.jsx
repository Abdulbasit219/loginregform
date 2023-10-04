import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './pages/About Page/about';
import SignIn from './pages/signIn-form/signIn';
import SignUp from './pages/SignUp-form/signUp';
import Home from './pages/Home/home';
import Navbar from './components/Navbar/navbar';

function App() {
    return (
        <>
            <BrowserRouter>
            <Navbar />
                <Routes>
                    <Route path='/' element= { <Home/> } />
                    <Route path='about' element= { <About /> } />
                    <Route path='SignIn' element={ <SignIn/>} />
                    <Route path='signUp' element={ <SignUp/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App