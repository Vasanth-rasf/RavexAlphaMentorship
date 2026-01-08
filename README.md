# 🎯 Elite Mentorship Application System

A modern, professional mentorship application form with email notifications and Google Sheets integration.

## ✨ Features

- 🎨 **Modern UI** - Clean, dark theme with yellow accent colors
- 📧 **Email Notifications** - Sends beautiful HTML emails to both admin and applicant
- 📊 **Google Sheets Integration** - Automatically saves submissions to Google Sheets
- 🔄 **Loading States** - Professional loading spinner during submission
- ✅ **Form Validation** - Client-side and server-side validation
- 📱 **Responsive Design** - Works perfectly on all devices

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the `.env` file and update with your credentials:

```env
# Email Configuration (Required)
SENDER_EMAIL=your-email@gmail.com
MAIL_PASSWORD=your-app-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
RECEIVER_EMAIL=admin-email@gmail.com

# Google Sheets (Optional)
GOOGLE_SHEET_ID=your-sheet-id
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account",...}
```

### 3. Start the Server

```bash
node server.js
```

### 4. Open in Browser

Navigate to: `http://localhost:3000`

## 📊 Google Sheets Setup (Optional)

For detailed instructions on setting up Google Sheets integration, see:

👉 **[GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)**

### Quick Setup Helper

If you have your Google credentials JSON file:

```bash
node setup-sheets-credentials.js path/to/credentials.json
```

This will output the properly formatted credentials to add to your `.env` file.

## 📧 Email Setup

### Gmail Setup

1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password:
   - Go to Google Account → Security → 2-Step Verification → App passwords
   - Select "Mail" and "Other (Custom name)"
   - Copy the generated password
3. Add to `.env`:
   ```
   SENDER_EMAIL=your-email@gmail.com
   MAIL_PASSWORD=xxxx xxxx xxxx xxxx
   ```

## 📝 Form Fields

The application form collects:

- Full Name
- Email Address
- Phone Number
- College/University
- Year of Study
- Why they want to join
- What they expect to learn
- Prior coding experience (optional)
- Commitment confirmation

## 🎨 Customization

### Colors

The design uses:
- **Primary Red**: `#ee2b2b`
- **Accent Gold**: `#FFD700`
- **Background**: `#050505`
- **Cards**: `#0f0f0f`

### Fonts

- **Space Grotesk** - Main font
- **Material Symbols** - Icons

## 📂 Project Structure

```
mentorship/
├── index.html                      # Main application page
├── server.js                       # Express server with email & sheets
├── .env                           # Environment variables
├── package.json                   # Dependencies
├── GOOGLE_SHEETS_SETUP.md        # Sheets setup guide
├── setup-sheets-credentials.js   # Helper script
└── README.md                     # This file
```

## 🔧 Troubleshooting

### Email not sending
- Check your Gmail app password is correct
- Verify 2FA is enabled on your Google account
- Check SMTP settings in `.env`

### Google Sheets not working
- Verify you've shared the sheet with the service account email
- Check the Sheet ID is correct
- Ensure credentials JSON is on one line in `.env`
- See [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md) for details

### Form not submitting
- Check browser console for errors
- Verify server is running on port 3000
- Check network tab for API response

## 📱 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## 🛡️ Security Notes

- Never commit `.env` file to version control
- Keep your Google credentials JSON file secure
- Use app passwords, not your actual Gmail password
- The service account has limited access (only to shared sheets)

## 📄 License

MIT License - Feel free to use for your projects!

## 🤝 Support

For issues or questions, check the troubleshooting section or review the setup guides.

---

Made with ❤️ for Elite Mentorship

