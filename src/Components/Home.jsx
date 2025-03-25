import React from 'react'
// import { Link } from 'react-router-dom'
import "./Home.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import PythonImg from "../Pictures/Python.png";
import JavaImg from "../Pictures/Java.png";
import WebDesignImg from "../Pictures/WebDesign.png";
import MernImg from "../Pictures/MernStack.png";
import StudyPic from "../Pictures/GirlWithBook.png";
import teacher1 from "../Pictures/teacher1.png"
import teacher2 from "../Pictures/teacher2.png"
import teacher3 from "../Pictures/teacher3.png"
import teacher4 from "../Pictures/teacher4.png"

import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <header className='headerTag'>

        <div className='Logo'>
          <img src="../../public/Images/SkillParsLogo.png" alt="Logo" />
          <span className='S'>S</span>
          <span className='kill'>kill</span>
          <span className='P'>P</span>
          <span className='ars'>ars</span>
        </div>

        <div className='Navigations'>
          <ul>
            <li><Link to="/" >Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><a href="#demo" >Courses Demo</a></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </div>

        <div className='search-login'>
          <input type="search" placeholder="Search..." className="search-bar" />
          <Link to="/login" className="login-btn">Login</Link>
        </div>

      </header>
      {/* ------------------------section1-------------------------- */}

      <section className='section1'>
        <img className='Pic-1Home' src="/Images/Pic1.jpg" alt="img" />
        <div className="contentAboutSKillPars">
          <h1>Upgrade Your Skills with SkillPars!</h1>
          <h3>An investment in knowledge pays the best interest</h3>
          <p>SkillPars offers high-quality courses in technical fields, helping you master in-demand skills through interactive online classes and expert guidance.</p>
          {/* <button>Book a Demo</button> */}
          <a href="#demo">Book a Demo</a>

        </div>
      </section>
      {/* ------------------------section2 Courses-------------------------- */}

      <h2 className="Courses Heading" id="demo">Courses</h2>
      <section className="CoursesSec">
        <div className="Course1">
          <div className="card1">
            <h2>What Do I Teach?</h2>
            <p>We provide hands-on training in trending technical skills, including web development, Python, Java, AI, blockchain, and more, ensuring career growth.</p>
            <button>Show More</button>
          </div>
        </div>
        <div className="CourseCards">
          <div className="card2">
            <img src={PythonImg} alt="PythonImg" />
            <h4>Python Programming</h4>
            <button>
              <Link to="/demo?course=Python Programming">Book a Demo</Link>
            </button>
          </div>
          <div className="card2">
            <img src={JavaImg} alt="JavaImg" />
            <h4>Java Programming</h4>
            <button>
              <Link to="/demo?course=Java Programming">Book a Demo</Link>
            </button>
          </div>
          <div className="card3">
            <img src={WebDesignImg} alt="WebDesignImg" />
            <h4>Web Design</h4>
            <button>
              <Link to="/demo?course=Web Design">Book a Demo</Link>
            </button>
          </div>
          <div className="card4">
            <img src={MernImg} alt="MERNImg" />
            <h4>MERN Stack</h4>
            <button>
              <Link to="/demo?course=MERN Stack">Book a Demo</Link>
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------section3  About-------------------------- */}

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
      {/* ------------------------section3  About-------------------------- */}

      <div className="expertTitle">
        <h2>Learn from Creative Experts</h2>
        <p>SkillPars offers expert-led classes where industry leaders share their best practices, techniques, and real-world experiences to help you succeed</p>
      </div>
      <section className="experts">
        <div className="expert one">
          <img src={teacher1} alt="expert1" />
          <div>
            <h3>Kian </h3>
            <h5>Python Developer</h5>
          </div>
        </div>

        <div className="expert two">
          <img src={teacher2} alt="expert2" />
          <div>
            <h3>Elina</h3>
            <h5>Web Designer</h5>
          </div>
        </div>

        <div className="expert three">
          <img src={teacher3} alt="expert3" />
          <div>
            <h3>Sianna</h3>
            <h5>Java Developer</h5>
          </div>
        </div>

        <div className="expert four">
          <img src={teacher4} alt="expert4" />
          <div>
            <h3>Aryan </h3>
            <h5>Frontend Developer</h5>
          </div>
        </div>

      </section>


      {/* ------------------------Footer-------------------------- */}
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
          <p><Link to="/teacher_registration">Teacher Registration</Link></p>
        </div>

      </footer>

    </>
  )
}

export default Home
