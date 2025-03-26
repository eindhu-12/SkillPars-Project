// src/Server/server.js
import express from 'express';
import mysql from 'mysql2/promise';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables
dotenv.config();

const app = express();

// Enable CORS with explicit logging
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Fallback
  next();
});

app.use(express.json());

// MySQL Database Connection
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
};

const pool = mysql.createPool(dbConfig);

// Email Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Course Zoom Links
const courseLinks = {
  "Python Programming": "https://us05web.zoom.us/j/84431906620?pwd=yuvuIh8uZfUeuX0BYUMmQRx9cHbiab.1",
  "Java Programming": "https://us05web.zoom.us/j/86125029201?pwd=KJPpgxUsrj0IWBylfOsz7O7iO0bn0v.1",
  "Web Design": "https://us05web.zoom.us/j/86125029201?pwd=KJPpgxUsrj0IWBylfOsz7O7iO0bn0v.1",
  "MERN Stack": "https://us05web.zoom.us/j/85142597860?pwd=XzWjJKeekYCtiAbZaokbwLKFhhqZkr.1",
};

// API Endpoint for Registration
app.post('/api/register', async (req, res) => {
  console.log('POST /api/register received:', req.body);
  const { name, email, course, phone, gender, qualification, city, country } = req.body;

  try {
    const connection = await pool.getConnection();
    console.log('Database connection established');

    const [existing] = await connection.query(
      'SELECT * FROM demo WHERE email = ? AND course = ?',
      [email, course]
    );
    console.log('Existing records:', existing);

    const demoTime = '10:00 AM - 11:00 AM';
    const zoomLink = courseLinks[course] || 'No link available';

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: `Demo Session Registration - ${course}`,
      text: `Hello ${name},\n\nYou have successfully registered for the ${course} demo session.\n\nDetails:\nDate: Tomorrow\nTime: ${demoTime}\nZoom Link: ${zoomLink}\n\nBest regards,\nSkillPars Team`,
    };

    if (existing.length > 0) {
      console.log('User already registered, sending email');
      await transporter.sendMail(mailOptions);
      connection.release();
      return res.json({ message: 'You are already registered. Zoom link sent to your email.' });
    }

    console.log('Inserting new registration');
    await connection.query(
      'INSERT INTO demo (name, email, course, phone, gender, qualification, city, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, email, course, phone, gender, qualification, city, country]
    );

    console.log('Sending email');
    await transporter.sendMail(mailOptions);

    connection.release();
    res.json({ message: 'Registration successful! Zoom link sent to your email.' });
  } catch (error) {
    console.error('Error in registration:', error);
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
});

// Handle preflight requests
app.options('/api/register', cors(), (req, res) => {
  console.log('OPTIONS /api/register received');
  res.sendStatus(200);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});