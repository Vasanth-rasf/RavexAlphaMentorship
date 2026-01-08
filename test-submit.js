/**
 * Test script to submit a sample form
 * This will test both email and Google Sheets integration
 */

const http = require('http');

// Sample test data
const testData = {
  name: 'John Doe',
  email: 'john.doe.test@example.com',
  phone: '9876543210',
  college: 'MIT - Massachusetts Institute of Technology',
  year: '3rd Year',
  why: 'I am passionate about learning new technologies and want to improve my coding skills. I believe this mentorship program will help me grow as a developer and learn industry best practices.',
  expectations: 'I expect to learn advanced programming concepts, work on real-world projects, and get guidance from experienced mentors. I also hope to build a strong foundation in software development.',
  experience: 'I have been coding for 2 years. I know Python, JavaScript, and have built a few personal projects including a weather app and a todo list application.',
  commitment: true
};

// Convert data to JSON
const postData = JSON.stringify(testData);

// HTTP request options
const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/submit-application',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('\n🚀 Submitting test form...\n');
console.log('📋 Test Data:');
console.log('─'.repeat(60));
console.log(`Name:        ${testData.name}`);
console.log(`Email:       ${testData.email}`);
console.log(`Phone:       ${testData.phone}`);
console.log(`College:     ${testData.college}`);
console.log(`Year:        ${testData.year}`);
console.log(`Commitment:  ${testData.commitment ? 'Yes' : 'No'}`);
console.log('─'.repeat(60));
console.log('\n⏳ Sending request...\n');

// Make the request
const req = http.request(options, (res) => {
  let responseData = '';

  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    console.log('📨 Response received:\n');
    console.log('─'.repeat(60));
    console.log(`Status Code: ${res.statusCode}`);
    console.log(`Response:    ${responseData}`);
    console.log('─'.repeat(60));

    if (res.statusCode === 200) {
      console.log('\n✅ SUCCESS! Form submitted successfully!\n');
      console.log('📧 Check these:');
      console.log('   1. Admin email: vasanth.rasf@gmail.com');
      console.log('   2. User email: john.doe.test@example.com');
      console.log('   3. Google Sheet: Should have a new row!\n');
    } else {
      console.log('\n❌ ERROR! Form submission failed!\n');
    }
  });
});

req.on('error', (error) => {
  console.error('\n❌ Request failed:', error.message);
  console.log('\n💡 Make sure the server is running on http://localhost:3000\n');
});

// Send the request
req.write(postData);
req.end();

