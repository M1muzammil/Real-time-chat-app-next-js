"use client"
import './login.css'
import React from 'react'
import Link from 'next/link'
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect , useRef ,useState } from "react";
import Ved from "../asset/back.mp4"
import axios from 'axios';

const singup = () => {
  useEffect(() => {
    AOS.init();
  }, []);



  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');

  const LoginSubmitHandler = async (e) => {
      e.preventDefault();

      try {
          const response = await axios.post(`/api/v1/auth/login`, {
             
              email: emailInputRef.current.value,
              password: passwordInputRef.current.value,
          });

          if (response && response.data && response.data.message) {
              console.log("resp: ", response.data.message);
           

              emailInputRef.current.value = '';
              passwordInputRef.current.value = '';
              setErrorMessage('');

window.location.href = "chats"

          } else {
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
{/* 
      <video width="100vw" height="100vh" autoPlay loop>
        <source src={Ved} type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}

      <div className="page" data-aos="flip-right">







        <div className='main'>
          <div className="headLink">
            <span className="signup-singin">
              <Link href="/pages/signup">
                <p>sign up</p>
              </Link>
              <Link href="/pages/login">
                <p> sing in</p>
              </Link>

            </span>
          </div>



          <form action="">

            <h1 id='heading' className='text-2xl p-2'>   Welcome Back !</h1>

            <div className="inputs">

              <span> <input type="Email" placeholder='alimuzammilali76@gmail.com'  ref={emailInputRef}  /></span>
              <span> <input type="password" placeholder='password' ref={passwordInputRef} /></span>
            </div>
            <div className="forget">
              <p>Don't Remember Password</p>
              <p id='red'>  Forget Password?</p>
            </div>

            <div className="but">
              <button id='signup' onClick={LoginSubmitHandler}>  sign in  </button>
            </div>

            <div className="hr">
              <hr /> <p>or sign in with</p> <hr />
            </div>

            <div className="show">
              <button id='google'>google</button>
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
