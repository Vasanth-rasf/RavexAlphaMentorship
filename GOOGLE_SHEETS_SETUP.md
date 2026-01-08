# 📊 Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets integration to automatically save form submissions.

## 🎯 What You'll Get

Every form submission will be automatically saved to a Google Sheet with these columns:
- Timestamp
- Name
- Email
- Phone
- College
- Year
- Why Join
- Expectations
- Experience
- Commitment

---

## 📋 Step-by-Step Setup

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Select a project"** → **"New Project"**
3. Enter project name: `Mentorship Form`
4. Click **"Create"**

### Step 2: Enable Google Sheets API

1. In your project, go to **"APIs & Services"** → **"Library"**
2. Search for **"Google Sheets API"**
3. Click on it and press **"Enable"**

### Step 3: Create Service Account

1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"Create Credentials"** → **"Service Account"**
3. Enter details:
   - **Service account name**: `mentorship-form-service`
   - **Service account ID**: (auto-generated)
4. Click **"Create and Continue"**
5. For role, select **"Editor"** (or you can skip this)
6. Click **"Done"**

### Step 4: Create Service Account Key

1. Click on the service account you just created
2. Go to **"Keys"** tab
3. Click **"Add Key"** → **"Create new key"**
4. Select **"JSON"** format
5. Click **"Create"**
6. A JSON file will be downloaded - **SAVE THIS FILE SECURELY!**

### Step 5: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it: `Mentorship Applications`
4. In **Sheet1**, add these headers in Row 1:
   ```
   A1: Timestamp
   B1: Name
   C1: Email
   D1: Phone
   E1: College
   F1: Year
   G1: Why Join
   H1: Expectations
   I1: Experience
   J1: Commitment
   ```

### Step 6: Share Sheet with Service Account

1. In your Google Sheet, click **"Share"** button
2. Open the JSON file you downloaded in Step 4
3. Find the `client_email` field (looks like: `mentorship-form-service@xxxxx.iam.gserviceaccount.com`)
4. Copy that email address
5. Paste it in the "Share" dialog
6. Give it **"Editor"** access
7. **Uncheck** "Notify people"
8. Click **"Share"**

### Step 7: Get Sheet ID

1. Look at your Google Sheet URL:
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
   ```
2. Copy the `SHEET_ID_HERE` part (between `/d/` and `/edit`)

### Step 8: Update .env File

1. Open your `.env` file
2. Add the Sheet ID:
   ```
   GOOGLE_SHEET_ID=your_sheet_id_here
   ```
3. For the credentials, open the JSON file you downloaded
4. Copy the **ENTIRE** JSON content (it should be one line)
5. Add it to `.env`:
   ```
   GOOGLE_SHEETS_CREDENTIALS={"type":"service_account","project_id":"...entire JSON here..."}
   ```

**Important**: The JSON should be on ONE line, no line breaks!

---

## ✅ Testing

1. Restart your server:
   ```bash
   node server.js
   ```

2. You should see:
   ```
   ✅ Google Sheets integration enabled
   Server is running on http://localhost:3000
   ```

3. Submit a test form

4. Check your Google Sheet - you should see a new row!

---

## 🔧 Troubleshooting

### "Google Sheets integration disabled"
- Check if `GOOGLE_SHEETS_CREDENTIALS` is set in `.env`
- Make sure the JSON is valid (no line breaks)

### "Error adding to Google Sheets"
- Verify you shared the sheet with the service account email
- Check if the Sheet ID is correct
- Make sure the sheet name is "Sheet1" (or update the code)

### "Permission denied"
- The service account email must have Editor access to the sheet
- Re-share the sheet with the correct email

---

## 📝 Notes

- The integration is **optional** - emails will still work even if Sheets fails
- Data is saved in real-time as forms are submitted
- You can export the sheet to Excel/CSV anytime
- The service account email will appear as "Last edited by" in Google Sheets

---

## 🎉 Done!

Your form submissions will now be automatically saved to Google Sheets!

