// src/Server/server.js
import express from 'express';
import mysql from 'mysql2/promise'; // Reintroduced for teacher registration
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables
dotenv.config();

const app = express();

// Enable CORS for http://localhost:5173
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

// Debug middleware
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});

app.use(express.json());

// MySQL Database Connection (for teacher registration)
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
};

const pool = mysql.createPool(dbConfig);

// Email Transporter (for demo registration)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Course Zoom Links (for demo registration)
const courseLinks = {
  "Python Programming": "https://us05web.zoom.us/j/84431906620?pwd=yuvuIh8uZfUeuX0BYUMmQRx9cHbiab.1",
  "Java Programming": "https://us05web.zoom.us/j/86125029201?pwd=KJPpgxUsrj0IWBylfOsz7O7iO0bn0v.1",
  "Web Design": "https://us05web.zoom.us/j/86125029201?pwd=KJPpgxUsrj0IWBylfOsz7O7iO0bn0v.1",
  "MERN Stack": "https://us05web.zoom.us/j/85142597860?pwd=XzWjJKeekYCtiAbZaokbwLKFhhqZkr.1",
};

// Demo Registration Endpoint (Email only)
app.post('/api/register', async (req, res) => {
  console.log('POST /api/register received:', req.body);
  const { name, email, course } = req.body;

  try {
    const demoTime = '10:00 AM - 11:00 AM';
    const zoomLink = courseLinks[course] || 'No link available';

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: `Demo Session Registration - ${course}`,
      text: `Hello ${name},\n\nYou have successfully registered for the ${course} demo session.\n\nDetails:\nDate: Tomorrow\nTime: ${demoTime}\nZoom Link: ${zoomLink}\n\nBest regards,\nSkillPars Team`,
    };

    console.log('Sending email to:', email);
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');

    res.json({ message: 'Registration successful! Zoom link sent to your email.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
});

// Check Duplicate Teacher Endpoint
app.post('/checkDuplicate', async (req, res) => {
  console.log('POST /checkDuplicate received:', req.body);
  const { email, phone } = req.body;

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      'SELECT * FROM teachers WHERE email = ? OR phone = ?',
      [email, phone]
    );
    connection.release();

    res.json({ exists: rows.length > 0 });
  } catch (error) {
    console.error('Error checking duplicates:', error);
    res.status(500).json({ message: 'Error checking duplicates.' });
  }
});

// Teacher Registration Endpoint
// Teacher Registration Endpoint
app.post('/registerTeacher', async (req, res) => {
  console.log('POST /registerTeacher received:', req.body);
  const { name, email, phone, course, experience, qualifications, skills, interviewCompleted } = req.body;

  try {
    const connection = await pool.getConnection();
    await connection.query(
      'INSERT INTO teachers (name, email, phone, course, experience, qualifications, skills, interviewCompleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, email, phone, course, experience || null, qualifications, skills, interviewCompleted]
    );
    connection.release();

    // Send registration confirmation email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'SkillPars - Teacher Registration Successful',
      text: `Dear ${name},\n\nYour registration as a teacher on SkillPars has been successfully completed.\n\nCourse Assigned: ${course}\nContact: ${phone}\n\nWe will notify you about the next steps soon.\n\nBest regards,\nSkillPars Team`
    };

    await transporter.sendMail(mailOptions);
    console.log('Registration confirmation email sent to:', email);

    res.json({ message: 'Teacher registered successfully! Confirmation email sent.' });
  } catch (error) {
    console.error('Error registering teacher:', error);
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
});


// Handle preflight requests
app.options('*', cors(), (req, res) => {
  console.log(`OPTIONS request received for ${req.path}`);
  res.sendStatus(200);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});