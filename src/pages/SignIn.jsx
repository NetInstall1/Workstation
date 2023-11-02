import React from 'react'
import '../styles/SignIn.css'
import { useState } from 'react';
import { BASE_URL } from '../config';
import { Link, useNavigate } from "react-router-dom";
// import user_icon from 'login-signup/src/components/assestss/email.png'
// import email_icon from 'login-signup/src/components/assestss/email.png' 
// import password_icon from 'login-signup/src/components/assestss/email.png'

const SignIn = () => {
  const navigate = useNavigate();

  const [action, setAction] = useState("Sign In");
  const [user_email, setUserEmail] = useState('')
  const [user_pass, setUserPass] = useState('')

  const handleEmail = (e) => {
    console.log(`Email: ${e.target.value}`)
    setUserEmail(e.target.value)
  }

  const handlePass = (e) => {
    console.log(`Pass: ${e.target.value}`)
    setUserPass(e.target.value)
  }

  const handleSigninSubmit=()=>{
    fetch(`${BASE_URL}/user`,{
      method:"post",
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify({user_email: user_email, user_pass: user_pass})
    }).then((res)=>{
      console.log(res.json())
      navigate("/dashboard")
    }).catch((err)=>{
      console.log(err)
    })
  }
  return (
    <><div className='signin-container'>
      <div className="signin-header">
        <div className="signin-text">{action} </div>
        <div className="signin-underline"></div>
      </div>

      <div className="signin-input">
        {/* <img src={email_icon} alt="" />  */}
        <input
          placeholder="Email Id"
          type="text"
          onChange={handleEmail}
        />
      </div>

      <div className="signin-input">
        {/* <img src={password_icon} alt="" />  */}
        <input
          placeholder="Password"
          type="text"
          onChange={handlePass}
        />
      </div>
{/* 
      <div
        className= "signin-submit"
        onClick={() => { setAction("Sign Up") }}
      >Submit
      </div> */}


    </div><div className="signin-submit-container">
        <div
          className={action === "Sign In" ? "signin-submit signin-gray" : "signin-submit"}
          onClick={() => { setAction("Sign Up") }}
        >Sign Up
        </div>

        <div
          className={action === "Sign Up" ? "signin-submit signin-gray" : "signin-submit"}
          onClick={() => { setAction("Sign In") }}
        >Sign In
        </div>
      </div></>
  );
};

export default SignIn
