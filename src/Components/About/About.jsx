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
                <div className='space'>
                    
                </div>

            </header>
        </>
    )
}

export default About
