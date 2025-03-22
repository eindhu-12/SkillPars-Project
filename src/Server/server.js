import "dotenv/config";
import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import axios from "axios";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT, // Should be 3307 based on your .env file
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL database");
  }
});

// Function to generate a JWT token for Zoom API
const generateZoomJWT = () => {
  const payload = {
    iss: process.env.ZOOM_API_KEY,
    exp: Math.floor(Date.now() / 1000) + 60 * 5, // Token valid for 5 minutes
  };
  return jwt.sign(payload, process.env.ZOOM_API_SECRET);
};

// Function to generate Zoom meeting link using the JWT token
const createZoomMeeting = async () => {
  try {
    const token = generateZoomJWT();
    const response = await axios.post(
      "https://api.zoom.us/v2/users/me/meetings",
      {
        topic: "SkillPars Demo Session",
        type: 2, // Scheduled meeting
        start_time: new Date().toISOString().split("T")[0] + "T15:00:00Z", // 3 PM UTC
        duration: 60,
        timezone: "Asia/Kolkata",
        settings: {
          host_video: true,
          participant_video: true,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.join_url;
  } catch (error) {
    console.error(
      "❌ Error creating Zoom meeting:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};

// Route to handle demo registration
app.post("/register", async (req, res) => {
  const { name, email, phone, course } = req.body;
  const zoomLink = await createZoomMeeting();

  if (!zoomLink) {
    return res.status(500).json({ message: "Failed to create Zoom meeting" });
  }

  // Insert demo registration into MySQL
  const sql = "INSERT INTO Demo (name, email, phone, course) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, email, phone, course], (err, result) => {
    if (err) {
      console.error("❌ Database insert failed:", err);
      return res.status(500).json({ message: "Database error" });
    }
    console.log("✅ Demo registration stored in database");

    // Send email with Zoom link
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "SkillPars Demo Session Confirmation",
      html: `
        <h2>Hello ${name},</h2>
        <p>Thank you for registering for the SkillPars demo session for <strong>${course}</strong>.</p>
        <p>Your session is scheduled for <strong>3:00 PM - 4:00 PM IST today.</strong></p>
        <p>Click the link below to join the session:</p>
        <a href="${zoomLink}" target="_blank">${zoomLink}</a>
        <p>Looking forward to seeing you!</p>
        <p>Best Regards,</p>
        <p>SkillPars Team</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("❌ Email sending failed:", error);
        return res.status(500).json({ message: "Email sending failed" });
      }
      console.log("✅ Email sent:", info.response);
      res.status(200).json({ message: "Demo registration successful!" });
    });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
