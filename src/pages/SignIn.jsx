import React from 'react'
import '../styles/SignIn.css'
import { useState } from 'react';
import { BASE_URL } from '../config';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
  const navigate = useNavigate();

  const [action, setAction] = useState("Sign In");
  const [user_email, setUserEmail] = useState('')
  const [user_pass, setUserPass] = useState('')
  const [user_name, setUserName] = useState('');

  const handleUsername = (e) => {
    setUserName(e.target.value);
  };

  const handleEmail = (e) => {  
    setUserEmail(e.target.value)
  }

  const handlePass = (e) => {
    setUserPass(e.target.value)
  }

  const handleSigninSubmit = () => {
    // Check if either the email or password is empty
  if (!user_email.trim() || !user_pass.trim()) {
    toast.error("Email and Password cannot be empty.", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return; // Exit the function if validation fails
  }
  let userData = action === 'Sign Up' 
  ? { user_email: user_email, user_pass: user_pass, user_name: user_name } 
  : { user_email: user_email, user_pass: user_pass };

  
    const endpoint = action === 'Sign In' ? '/authenticate' : '/create-user';
  
    fetch(`${BASE_URL}${endpoint}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) {
            // Token is expired or invalid
            toast.error("Session expired. Please sign in again.", {
              position: toast.POSITION.TOP_RIGHT,
            });
            navigate('/');
          }
          throw new Error('Authentication failed');
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.message);
        toast.success("Authentication successful", {
          position: toast.POSITION.TOP_RIGHT,
        });
        // Store the token in local storage or state
        localStorage.setItem('token', data.token); // Assuming the token is in data.token
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
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

        {action === "Sign Up" && (
        <div className="signin-input">
          <input
            placeholder="Username"
            type="text"
            value={user_name}
            onChange={handleUsername}
          />
        </div>
        )}

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