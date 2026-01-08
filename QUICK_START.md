# ⚡ Quick Start Guide

## 🎯 Current Status

✅ **Email Integration** - Working (sends to vasanth.rasf@gmail.com)
⏳ **Google Sheets** - Ready to configure (optional)

---

## 🚀 To Run the Application

```bash
node server.js
```

Then open: **http://localhost:3000**

---

## 📊 To Enable Google Sheets (Optional)

### Option 1: Follow Full Guide
See **[GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)** for detailed instructions.

### Option 2: Quick Steps

1. **Create Google Cloud Project**
   - Go to: https://console.cloud.google.com/
   - Create new project: "Mentorship Form"

2. **Enable Google Sheets API**
   - APIs & Services → Library
   - Search "Google Sheets API" → Enable

3. **Create Service Account**
   - APIs & Services → Credentials
   - Create Credentials → Service Account
   - Download JSON key file

4. **Create Google Sheet**
   - Create new sheet: "Mentorship Applications"
   - Add headers: Timestamp, Name, Email, Phone, College, Year, Why Join, Expectations, Experience, Commitment

5. **Share Sheet**
   - Share with service account email (from JSON file)
   - Give Editor access

6. **Update .env**
   ```bash
   # Use helper script
   node setup-sheets-credentials.js path/to/credentials.json
   
   # Copy output to .env
   # Add Sheet ID from URL
   ```

7. **Restart Server**
   ```bash
   pkill -f "node server.js"
   node server.js
   ```

---

## 🧪 Test the Form

1. Open http://localhost:3000
2. Click "Apply" button
3. Fill out the form
4. Submit

**You should get:**
- ✅ Email to admin (vasanth.rasf@gmail.com)
- ✅ Email to applicant
- ✅ Row added to Google Sheet (if configured)

---

## 📝 What Happens on Submit

1. **Loading spinner** appears
2. **3 parallel actions**:
   - Send email to admin
   - Send email to applicant
   - Save to Google Sheets (if configured)
3. **Success message** shown
4. **Modal closes** and form clears

---

## 🔧 Common Commands

```bash
# Start server
node server.js

# Stop server
pkill -f "node server.js"

# Check if server is running
lsof -ti:3000

# Format Google credentials
node setup-sheets-credentials.js credentials.json

# Install dependencies
npm install
```

---

## 📧 Email Configuration

Already configured for: **vasanth.rasf@gmail.com**

To change:
1. Update `.env` file
2. Use Gmail App Password (not regular password)
3. Restart server

---

## 🎨 Customization

### Change Colors
Edit `index.html` - search for:
- `#ee2b2b` (red)
- `#FFD700` (gold)
- `#050505` (background)

### Change Email Template
Edit `server.js` - look for `adminMailOptions` and `userMailOptions`

### Change Form Fields
Edit `index.html` - update form section and `server.js` to match

---

## 📂 Important Files

- `index.html` - Frontend (form UI)
- `server.js` - Backend (email + sheets)
- `.env` - Configuration (credentials)
- `package.json` - Dependencies

---

## ⚠️ Troubleshooting

### Server won't start
```bash
# Kill any process on port 3000
lsof -ti:3000 | xargs kill -9

# Try again
node server.js
```

### Email not sending
- Check `.env` has correct Gmail app password
- Verify 2FA is enabled on Google account

### Sheets not working
- Check console for "✅ Google Sheets integration enabled"
- If you see "⚠️ Google Sheets integration disabled", credentials are missing
- Verify sheet is shared with service account email

---

## 🎉 You're All Set!

The application is ready to use. Google Sheets integration is optional but recommended for easy data management.

**Need help?** Check the full guides:
- [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)
- [README.md](./README.md)

