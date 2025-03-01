import React from 'react'
import { Link } from 'react-router-dom'
import "./Home.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; 
import Logo from '../Pictures/SkillParsLogo.png';
import Pic1 from "../Pictures/Pic1.jpg"


const Home = () => {
  return (
    <>
    <header className='headerTag'>

      <div className='Logo'>
        <img src={Logo} alt="Logo" />
        <span className='S'>S</span>
        <span className='kill'>kill</span>
        <span className='P'>P</span>
        <span className='ars'>ars</span>
      </div>

      <div className='Navigations'>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Courses</li>
          <li>Services</li>
        </ul>
      </div>

      <div className='search-login'>
          <input type="search" placeholder="Search..." className="search-bar" />
          <Link to="/login" className="login-btn">Login</Link>
        </div>

    </header>

    <section className='section1'>
      <img src={Pic1} alt="img" />
    </section>

    
      <div>
        Completed with authentication <br />
        <Link to={"/signup"}>SignUp</Link><br />
        <Link to={"/login"}>Login</Link>
      </div>

      <footer className='FotterHome'>
      <div className='FooterLogo'>
        <div className="logoContainer">
        <span className='SF'>S</span>
        <span className='kill'>kill</span>
        <span className='PF'>P</span>
        <span className='ars'>ars</span>
        </div>
        <div className='quote'>Discover, learn, excel, inspire, achieve</div>
      </div>
      <div className="Company">
        <div>Company</div>
        <p>About</p>
        <p>Carrers</p>
        <p>Patnership</p>

      </div>
      <div className='socialmedia'>
        <div>Socialmedia</div>
        <span><i class="fa-brands fa-instagram"></i>Instagram</span>
        <span><i class="fa-brands fa-facebook"></i>Facebook</span>
        <span><i class="fa-brands fa-linkedin"></i>LinkedIn</span>
        <span><i class="fa-solid fa-phone-volume"></i>+9189xxxxxx57</span>

      </div>
      <div className="Teacher">
        <div>Teacher</div>
        <p>Become a Teacher</p>
        <p>Rules & Regulations</p>
      </div>
      </footer>

    </>
  )
}

export default Home
