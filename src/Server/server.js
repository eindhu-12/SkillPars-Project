require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const ZOOM_API_KEY = process.env.ZOOM_API_KEY;
const SENDER_EMAIL = process.env.SENDER_EMAIL;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

// Function to generate Zoom meeting link
const createZoomMeeting = async () => {
  try {
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
          Authorization: `Bearer ${ZOOM_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.join_url;
  } catch (error) {
    console.error("Error creating Zoom meeting:", error);
    return null;
  }
};

// Route to handle demo registration
app.post("/register", async (req, res) => {
  const { name, email, course } = req.body;
  const zoomLink = await createZoomMeeting();
  
  if (!zoomLink) {
    return res.status(500).json({ message: "Failed to create Zoom meeting" });
  }

  // Send email with Zoom link
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SENDER_EMAIL,
      pass: EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: SENDER_EMAIL,
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
      console.error("Email sending failed:", error);
      return res.status(500).json({ message: "Email sending failed" });
    }
    console.log("Email sent:", info.response);
    res.status(200).json({ message: "Demo registration successful!" });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
