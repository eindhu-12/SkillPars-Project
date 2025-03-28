import React, { useState } from 'react'
import "./Login.css"
import { Link, useNavigate } from 'react-router'
import { signInWithEmailAndPassword ,signInWithPopup } from 'firebase/auth';
import {auth ,Provider} from "../FirebaseConfig"
import { toast } from 'react-toastify';
import backgroundImg from '../Pictures/Bgshade.jpeg';
import Logo from "../Pictures/SkillPars-Logo.png";


const Login = () => {
  const [email,setEmail]=useState("");
  const [password, setPassword]=useState("");

  const navigate=useNavigate();

  const login  = async(event)=>{
    event.preventDefault();
    try{
      await signInWithEmailAndPassword(auth,email,password);
      toast("Login Successfully")
      setEmail("");
      setPassword("")
      navigate("/")

    }
    catch(error){
      toast(error.code)
    }
  }
  const signinWithGoogle = async () =>{
    try{
      const res =await signInWithPopup(auth,Provider)
      // console.log(res)
      toast("Login Successfully");
      navigate("/");

    }
    catch(error) {
      // console.log(error)
      toast(error.code)

    }
  }
  return (
    
    <div>
        
        <div className='MainContainer'>
          <div className='Logodiv'>
            <img src={Logo} alt="LogoImg" />
          </div>

          <div className='login-container'  >
            <h2>LogIn</h2>
            <form action="">
            <label>Email</label>
            <input
              type="email"
              // value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          <label>Password</label>
          <input
            type="password"
            // value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
          <br />

          <button className='btn-btn-primary' onClick={login}>Login</button>
          <br />

          <button className="google-button"  onClick={signinWithGoogle} >
            <img
              src="https://techdocs.akamai.com/identity-cloud/img/social-login/identity-providers/iconfinder-new-google-favicon-682665.png"
              alt="Google Logo"
            />
            Continue with Google
          </button>

          <p className="signup-text">
            Already have an account? 
            <Link to={"/signup"}>SignUp</Link>
            
          </p>
            </form>
        </div>
        </div>
       
        
    </div>
  )
}

export default Login



