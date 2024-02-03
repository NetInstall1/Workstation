import React from 'react'
import '../styles/SignIn.css'
import { useState } from 'react';
import { BASE_URL } from '../config';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

  const handleSigninSubmit = () => {
    const endpoint = action === 'Sign In' ? `/api/user/signin`  : `/api/user/create-user`;
    console.log(endpoint)
    fetch(`${BASE_URL}${endpoint}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_email: user_email, user_pass: user_pass }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Authentication failed');
        }
      })
      .then((data) => {
        localStorage.setItem('user',data._id)
        localStorage.setItem('token', data.token)
        toast.success("Authentication successful", {
          position: toast.POSITION.TOP_RIGHT,
        });

        navigate("/dashboard");
  
      })
      .catch((err) => {
        console.log(err);
  
        // Show an error toast notification
        
        toast.error("Authentication failed. Please try again.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  

  return (
    <div>
      <ToastContainer />
      <div className='signin-container'>
        <div className="signin-header">
          <div className="signin-text">{action} </div>
          <div className="signin-underline"></div>
        </div>

        <div className="signin-input">
          {/* <img src={email_icon} alt="" />  */}
          <input
            placeholder="Email Id"
            type="email"
            onChange={handleEmail}
          />
        </div>

        <div className="signin-input">
          {/* <img src={password_icon} alt="" />  */}
          <input
            
            placeholder="Password"
            type="password"
            onChange={handlePass}
          />
        </div>

        <div className='signin-submitform'>
          <button
            className='signin-sform'
            type="submit"
            onClick={handleSigninSubmit}>
            Submit
          </button>
        </div>
        <div>
          
        </div>

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
      </div></div>
  );
};

export default SignIn