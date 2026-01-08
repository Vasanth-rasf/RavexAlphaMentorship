#!/usr/bin/env node

/**
 * Helper script to format Google Sheets credentials for .env file
 * 
 * Usage:
 *   node setup-sheets-credentials.js path/to/your-credentials.json
 * 
 * This will output the properly formatted credential string to add to your .env file
 */

const fs = require('fs');
const path = require('path');

// Get the file path from command line arguments
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('\n❌ Error: Please provide the path to your Google credentials JSON file\n');
  console.log('Usage:');
  console.log('  node setup-sheets-credentials.js path/to/credentials.json\n');
  console.log('Example:');
  console.log('  node setup-sheets-credentials.js ~/Downloads/mentorship-form-service-xxxxx.json\n');
  process.exit(1);
}

const credentialsPath = args[0];

// Check if file exists
if (!fs.existsSync(credentialsPath)) {
  console.log(`\n❌ Error: File not found: ${credentialsPath}\n`);
  process.exit(1);
}

try {
  // Read and parse the JSON file
  const credentialsContent = fs.readFileSync(credentialsPath, 'utf8');
  const credentials = JSON.parse(credentialsContent);

  // Validate it's a service account
  if (credentials.type !== 'service_account') {
    console.log('\n⚠️  Warning: This doesn\'t look like a service account credentials file\n');
  }

  // Convert to single-line JSON string
  const singleLineJson = JSON.stringify(credentials);

  console.log('\n✅ Success! Copy the following lines to your .env file:\n');
  console.log('─'.repeat(80));
  console.log(`GOOGLE_SHEETS_CREDENTIALS=${singleLineJson}`);
  console.log('─'.repeat(80));
  
  console.log('\n📋 Service Account Email (use this to share your Google Sheet):');
  console.log('─'.repeat(80));
  console.log(credentials.client_email);
  console.log('─'.repeat(80));

  console.log('\n📝 Next Steps:');
  console.log('1. Copy the GOOGLE_SHEETS_CREDENTIALS line above to your .env file');
  console.log('2. Share your Google Sheet with the email address shown above');
  console.log('3. Add your GOOGLE_SHEET_ID to .env file');
  console.log('4. Restart your server\n');

} catch (error) {
  console.log(`\n❌ Error reading or parsing JSON file: ${error.message}\n`);
  process.exit(1);
}

