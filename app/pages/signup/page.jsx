"use client"
import './singup.css'
import React from 'react'
import { useEffect } from 'react'
import Link from 'next/link'
import AOS from "aos";
import "aos/dist/aos.css";
import Ved from "../asset/back.mp4"
import { useState, useRef } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../../context/store';

import { redirect } from 'next/navigation';



const singup = () => {


  
    const [isLoading, setIsLoading] = useState(true);
    const { userRole } = useGlobalContext();
console.log("user-role",userRole)
    useEffect(() => {
        if (userRole !== '') {
            // Check if userRole is not empty
            setIsLoading(false);
            if (userRole === 'login') {
                console.log("aaaaa")
                redirect('/chats');
            } else  {
               console.log("ok")
            } 
        }
    }, [userRole]);

    

    useEffect(() => {
        AOS.init();
    }, []);
    const firstNameInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState('');

    const SignupSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`/api/v1/auth`, {
                firstName: firstNameInputRef.current.value,
                email: emailInputRef.current.value,
                password: passwordInputRef.current.value,
            });

            if (response && response.data && response.data.message) {
                console.log("resp: ", response.data.message);
             
                firstNameInputRef.current.value = '';
                emailInputRef.current.value = '';
                passwordInputRef.current.value = '';
                setErrorMessage('');
          redirect("/chat")         } else {
                // Handle unexpected response structure here
                console.log("Unexpected response structure:", response);
                setErrorMessage("An unexpected error occurred.");
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("An error occurred while processing your request.");
        }
    };



    
    return (
        <div className="body">
            {/* <video width="100%" height="100%" autoPlay loop >
                <source src={Ved} type="video/mp4" />
                Your browser does not support the video tag.
            </video> */}



            <div className="page"

                data-aos="flip-left">



                <div className='main'>


                    <div className="headLink">

                        <span className="signup-singin">
                            <p>sign up</p>
                            <Link href="/pages/login">
                                <p> sing in</p>
                            </Link>

                        </span>
                    </div>



                    <form onSubmit={SignupSubmitHandler}>

                        <h1 id='heading'> Create An Account  </h1>

                        <div className="inputs">

                            <span>  <input type="text" placeholder='Muzammil Ali' ref={firstNameInputRef} /></span>
                            <span> <input type="Email" placeholder='alimuzammilali76@gmail.com' ref={emailInputRef}  /></span>
                            <span> <input type="password" placeholder='password'ref={passwordInputRef} /></span>
                            {errorMessage && <p>{errorMessage}</p>}
                        </div>
                        <div className="but">
                            <button id='signup'>  sign up  </button>
                        </div>

                        <div className="hr">
                            <hr /> <p>or sign up with</p> <hr />
                        </div>

                        <div className="show">
                            <button id='google'  >google</button>
                            <button id='facebook'>GitHub</button>
                        </div>
                        <div className="shapes">

                        </div>
                    </form>

                    
                </div>
            </div>
        </div>
    )
}

export default singup
