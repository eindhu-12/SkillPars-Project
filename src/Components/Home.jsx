import React from 'react'
import { Link } from 'react-router-dom'
import "./Home.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; 
import Logo from '../Pictures/SkillParsLogo.png';
import Pic1 from "../Pictures/Pic1.jpg"
import PythonImg from "../Pictures/Python.png"; 
import JavaImg from "../Pictures/Java.png"; 
import WenDesignImg from "../Pictures/WebDesign.png"; 
import MernImg from "../Pictures/MernStack.png"; 
// import StudyPic from "../Pictures/StudyGirlPic.png"; 
import StudyPic from "../Pictures/GirlWithBook.png"; 




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
    
    <h2 className='Courses Heading'>Courses</h2>
    <section className="CoursesSec">
      <div className="Course1">
        <div className="card1">
          <h2>What Do I Teach?</h2>
          <p>We provide hands-on training in trending technical skills, including web development, Python, Java AI, blockchain, and more, ensuring career growth.</p>
          <button>Show More</button>
        </div>
      </div>
      <div className="CourseCards">
        <div className='card2'>
          <img src={PythonImg} alt="PythonImg" />
          <h4>Python Programming</h4>
          <button>Book a Demo</button>
        </div>
        <div className="card2">
        <img src={JavaImg} alt="JavaImg" />
          <h4>Java Programming</h4>
          <button>Book a Demo</button>
        </div>
        <div className="card3">
        <img src={WenDesignImg} alt="WebDesignImg" />
          <h4>WenDesign</h4>
          <button>Book a Demo</button>
        </div>
        <div className="card4">
        <img src={MernImg} alt="MERNImg" />
          <h4>Mern Stack</h4>
          <button>Book a Demo</button>
        </div>
      </div>
    </section>

    <h2 className='About-1 Heading'>About</h2>
    <section className='AboutSection'>
      <div className="AboutApp">
      <div class="text-box">
        <h2>Learn, Explore, Together, Grow</h2>
    </div>
    
    <div class="description">
        <p>Learning is an ongoing journey that involves discovering new ideas, challenging our understanding, and continuously growing. The process of exploration allows us to delve deeper into topics, ask questions, and seek answers. By collaborating with others, we enhance our learning experience and broaden our perspectives. It's important to embrace the learning process every day and take the time to explore new concepts together with others, learning and growing as a community.</p>
    </div>
    <button className='KnowMoreBtn' >Know More</button>
    </div>

    <div className='studyImage'>
      <img src={StudyPic} alt="Pic" />
    </div>
    


    </section>

  

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
