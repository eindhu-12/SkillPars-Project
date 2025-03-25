import express from 'express';
import mysql from 'mysql2';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Create demo table if it doesn't exist
db.query(`
  CREATE TABLE IF NOT EXISTS demo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    course VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    passed_out_year INT NOT NULL,
    state VARCHAR(255) NOT NULL,
    qualification VARCHAR(255),
    gender VARCHAR(50),
    country VARCHAR(255),
    city VARCHAR(255),
    UNIQUE(email, course)
  )
`, (err) => {
  if (err) console.error('Error creating table:', err);
});

// Course links
const courseLinks = {
  "Python Programming": "https://us05web.zoom.us/j/84431906620?pwd=yuvuIh8uZfUeuX0BYUMmQRx9cHbiab.1",
  "Java Programming": "https://us05web.zoom.us/j/86125029201?pwd=KJPpgxUsrj0IWBylfOsz7O7iO0bn0v.1",
  "Web Design": "https://us05web.zoom.us/j/86125029201?pwd=KJPpgxUsrj0IWBylfOsz7O7iO0bn0v.1",
  "MERN Stack": "https://us05web.zoom.us/j/85142597860?pwd=XzWjJKeekYCtiAbZaokbwLKFhhqZkr.1"
};

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Registration endpoint
app.post('/register', async (req, res) => {
  const {
    name, email, course, phone, graduationYear, state,
    qualification, gender, country, city
  } = req.body;

  try {
    // Check if email and course combination exists
    const [existing] = await db.promise().query(
      'SELECT * FROM demo WHERE email = ? AND course = ?',
      [email, course]
    );

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: `Demo Session Link for ${course}`,
      text: `Hello ${name},\n\nThank you for registering for the ${course} demo session. Here is your Zoom link:\n\n${courseLinks[course]}\n\nBest regards,\nSkillPars Team`
    };

    if (existing.length > 0) {
      // If email and course exist, resend the link
      await transporter.sendMail(mailOptions);
      return res.json({ message: 'Demo link resent to your email!' });
    }

    // Insert new record if email-course combo doesn't exist
    await db.promise().query(
      'INSERT INTO demo (name, email, course, phone, passed_out_year, state, qualification, gender, country, city) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, email, course, phone, graduationYear, state, qualification, gender, country, city]
    );

    // Send email with course link
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Registration successful! Demo link sent to your email.' });

  } catch (error) {
    console.error('Error in registration:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ message: 'Email already registered for this course. Link resent!' });
    } else {
      res.status(500).json({ message: 'Error processing your request.' });
    }
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});