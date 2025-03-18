import React from 'react'
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import "../Home.css";
import "./About.css";



const About = () => {
    return (
        <>
            <header className='headerTag'>

                <div className='Logo'>
                    <img src="../../../public/Images/SkillParsLogo.png" alt="Logo" />
                    <span className='S'>S</span>
                    <span className='kill'>kill</span>
                    <span className='P'>P</span>
                    <span className='ars'>ars</span>
                </div>

                <div className='Navigations'>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li>Courses</li>
                        <li>Services</li>
                    </ul>
                </div>
                <div className='search-login'>
                    <input type="search" placeholder="Search..." className="search-bar" />
                </div>
            </header>
            
            <section className="sec-1About">
                <div className="about1Content">
                    <img src="../../../public/Images/AboutImg1.jpg" alt="" />
                    <h1>Discover, learn, excel, inspire, achieve</h1>
                </div>
            </section>

            <section className="sec-2About">
                <p>SkillPars is a leading platform that shares knowledge and nurtures developers through expert-led courses. With live sessions, recorded classes, and real-time collaboration, we ensure hands-on learning. Committed to excellence, we empower learners with the skills needed to succeed in the tech industry.</p>
                <p>With a strong track record, SkillPars has helped countless developers achieve their goals. Our community-driven approach fosters engagement, doubt-solving, and collaboration with industry experts. We continue to innovate, providing top-tier educational resources to shape future professionals.</p>

            </section>

            <h2 className='AtSkillPars'>At SkillPars, We Empower:</h2>
            <section className="sec-3AboutACC">
                
                <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Teachers
                            </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <p>Our instructors are industry experts dedicated to delivering high-quality education. They provide hands-on training, real-world insights, and personalized mentorship to help students excel.</p>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Students
                            </button>
                        </h2>
                        <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <p>SkillPars fosters a dynamic learning environment where students engage in interactive classes, practical projects, and collaborative sessions. We equip learners with the skills needed to thrive in the tech industry.</p>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Placements
                            </button>
                        </h2>
                        <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                            We have a strong track record of placing students in top companies. With expert guidance, industry connections, and career support, we help learners turn their knowledge into successful careers.
                            </div>
                        </div>
                    </div>
                </div>

                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3443.6009103914453!2d78.4022404!3d17.493049499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91625d9cd1ad%3A0x4455387ad24a675d!2s10000coders!5e1!3m2!1sen!2sin!4v1742284631881!5m2!1sen!2sin" frameborder="0">

                </iframe>
            </section>
            <section className='sec-4About'>
                <div className='AboutImage2'>
                    <img src="/Images/AboutLastPic.jpg" alt="Img" />
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
</div>

</footer>



        </>
    )
}

export default About
