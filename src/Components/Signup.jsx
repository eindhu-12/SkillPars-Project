import { Link, useNavigate } from "react-router";
import "./Signup.css"
import React, { useState } from "react"
import { createUserWithEmailAndPassword ,signInWithPopup } from "firebase/auth"
import { auth , Provider} from "../FirebaseConfig"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const navigate=useNavigate();

  async function signup(event){
    event.preventDefault();
    try{
      await createUserWithEmailAndPassword(auth,email,password);
      toast("Account Created Successfully")
      navigate("/login")
      setEmail("");
      setPassword("");
    }
    catch(error) {
      toast(error.code)
    }
  }

  const signupWithGoogle = async () =>{
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
    <>
    
      <div className='signup-container'>
        <h2>SignUp</h2>
        <form action="">

          <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
          <br />

          <p className="signup-text">
            Already have an account? 
            <Link to={"/login"} >LogIn</Link>
            
          </p>

          <button className="signup-btn" onClick={signup}>SignUp</button>

          <button className="google-button" onClick={signupWithGoogle}>
            <img
              src="https://techdocs.akamai.com/identity-cloud/img/social-login/identity-providers/iconfinder-new-google-favicon-682665.png"
              alt="Google Logo"
            />
            Continue with Google
          </button>

        </form>

      </div>
    </>
  )
}

export default Signup


