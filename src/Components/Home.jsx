import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      Completed with authentication
      <Link to={"/signup"}>SignUp</Link><br />
      <Link to={"/login"}>Login</Link>
    </div>
  )
}

export default Home
