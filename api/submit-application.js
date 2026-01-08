const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    ciphers: 'SSLv3',
  },
});

// Google Sheets client (initialized on demand)
let sheetsClient = null;

async function getGoogleSheetsClient() {
  if (sheetsClient) return sheetsClient;
  
  try {
    if (!process.env.GOOGLE_SHEETS_CREDENTIALS) {
      console.log('⚠️  Google Sheets integration disabled - No credentials found');
      return null;
    }

    const credentials = JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS);
    const auth = new google.auth.GoogleAuth({
      credentials: credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const authClient = await auth.getClient();
    sheetsClient = google.sheets({ version: 'v4', auth: authClient });
    
    console.log('✅ Google Sheets integration enabled');
    return sheetsClient;
  } catch (error) {
    console.error('❌ Error initializing Google Sheets:', error.message);
    return null;
  }
}

// Function to add data to Google Sheets
async function addToGoogleSheets(data) {
  try {
    const client = await getGoogleSheetsClient();
    
    if (!client || !process.env.GOOGLE_SHEET_ID) {
      console.log('⚠️  Skipping Google Sheets - Not configured');
      return;
    }

    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const values = [[
      timestamp,
      data.name,
      data.email,
      data.phone,
      data.college,
      data.year,
      data.why,
      data.expectations,
      data.experience || 'None',
      data.commitment ? 'Yes' : 'No'
    ]];

    await client.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:J',
      valueInputOption: 'RAW',
      resource: { values },
    });

    console.log('✅ Data added to Google Sheets');
  } catch (error) {
    console.error('❌ Error adding to Google Sheets:', error.message);
    // Don't throw - we don't want to fail the whole submission if sheets fails
  }
}

const handler = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method not allowed' });
    return;
  }

  const { name, email, phone, college, year, why, expectations, experience, commitment } = req.body;

  // Email to admin (notification)
  const adminMailOptions = {
    from: process.env.SENDER_EMAIL,
    to: process.env.RECEIVER_EMAIL,
    subject: '🎯 New Mentorship Application',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 700px;
            margin: 0 auto;
            background-color: #ffffff;
            border: 3px solid #FFD700;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .header {
            background: linear-gradient(135deg, #ee2b2b 0%, #c41e1e 100%);
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .section {
            margin-bottom: 25px;
            padding: 15px;
            background-color: #f9f9f9;
            border-left: 4px solid #FFD700;
            border-radius: 4px;
          }
          .section-title {
            color: #ee2b2b;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin: 0 0 8px 0;
            font-weight: bold;
          }
          .section-content {
            color: #333;
            font-size: 16px;
            line-height: 1.6;
            margin: 0;
            white-space: pre-wrap;
          }
          .highlight {
            background-color: #fff9e6;
            padding: 15px;
            border-radius: 8px;
            border: 2px solid #FFD700;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #eee;
            color: #666;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 New Mentorship Application</h1>
          </div>

          <div class="section">
            <p class="section-title">👤 Full Name</p>
            <p class="section-content">${name}</p>
          </div>

          <div class="section">
            <p class="section-title">📧 Email Address</p>
            <p class="section-content">${email}</p>
          </div>

          <div class="section">
            <p class="section-title">📱 Phone Number</p>
            <p class="section-content">${phone}</p>
          </div>

          <div class="section">
            <p class="section-title">🎓 College/University</p>
            <p class="section-content">${college}</p>
          </div>

          <div class="section">
            <p class="section-title">📚 Year of Study</p>
            <p class="section-content">${year}</p>
          </div>

          <div class="highlight">
            <p class="section-title">💡 Why do they want to join?</p>
            <p class="section-content">${why}</p>
          </div>

          <div class="highlight">
            <p class="section-title">🎯 What do they expect to learn?</p>
            <p class="section-content">${expectations}</p>
          </div>

          <div class="section">
            <p class="section-title">💻 Prior Coding Experience</p>
            <p class="section-content">${experience || 'None mentioned'}</p>
          </div>

          <div class="section">
            <p class="section-title">✅ Commitment Confirmed</p>
            <p class="section-content">${commitment ? '✅ Yes - Ready to commit' : '❌ No'}</p>
          </div>

          <div class="footer">
            <p>📅 Received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            <p style="margin-top: 10px; color: #ee2b2b; font-weight: bold;">Elite Mentorship Application System</p>
          </div>
        </div>
      </body>
      </html>
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
    // Send both emails and save to Google Sheets in parallel
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
      addToGoogleSheets({ name, email, phone, college, year, why, expectations, experience, commitment })
    ]);

    res.status(200).json({ success: true, message: 'Application submitted successfully! Check your email.' });
  } catch (error) {
    console.error('Error processing application:', error);
    res.status(500).json({ success: false, message: 'Failed to submit application.' });
  }
};

module.exports = handler;
module.exports.default = handler;

