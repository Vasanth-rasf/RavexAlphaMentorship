require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('.')); // Serve static files from current directory

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    ciphers: 'SSLv3',
  },
});

// Route to handle form submission
app.post('/submit', async (req, res) => {
  const { name, email, whatsapp, role } = req.body;

  // Email to admin (notification)
  const adminMailOptions = {
    from: process.env.SENDER_EMAIL,
    to: process.env.RECEIVER_EMAIL,
    subject: 'New Mentorship Application',
    html: `
      <h2>New Application Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>WhatsApp:</strong> ${whatsapp}</p>
      <p><strong>Role:</strong> ${role}</p>
    `,
  };

  // Thank you email to user
  const userMailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: 'Welcome to Elite Mentorship',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #0a0a0a;
            color: #ffffff;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #111111;
            border: 2px solid #ee2b2b;
            border-radius: 12px;
            padding: 40px;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 28px;
            font-weight: bold;
            letter-spacing: 2px;
            color: #ffffff;
          }
          .logo-accent {
            color: #ee2b2b;
          }
          .content {
            line-height: 1.8;
            font-size: 16px;
            color: #e0e0e0;
          }
          .content p {
            margin: 20px 0;
          }
          .highlight {
            color: #fbbf24;
            font-weight: bold;
            font-size: 18px;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #333;
            text-align: center;
            color: #888;
            font-size: 14px;
          }
          .name {
            color: #ee2b2b;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">ELITE<span class="logo-accent">MENTORSHIP</span></div>
          </div>
          <div class="content">
            <p>Hey <span class="name">${name}</span>,</p>

            <p><strong>We got your signup.</strong></p>

            <p>This isn't just a form submission — it's the start of something bigger.</p>

            <p class="highlight">You've already stepped ahead of most people.</p>

            <p>We'll review your details and reach out soon with what's next.</p>

            <p><strong>Stay ready.</strong><br>The journey has already started.</p>
          </div>
          <div class="footer">
            <p>© 2024 Elite Mentorship. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);

    res.json({ success: true, message: 'Application submitted successfully! Check your email.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to submit application.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});