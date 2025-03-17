import React from 'react'
import { Link } from 'react-router-dom'
import "../Home.css"
import "./About.css"


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
            <section className="sec-1">
                <div className="about1Content">
                    <img src="../../../public/Images/AboutImg1.jpg" alt="" />
                    <h1>Discover, learn, excel, inspire, achieve</h1>
                </div>
            </section>

        </>
    )
}

export default About
