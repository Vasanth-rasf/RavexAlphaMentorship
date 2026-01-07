// Test script to submit a sample mentorship application

const sampleFormData = {
  name: "John Doe",
  email: "johndoe@example.com",
  whatsapp: "+1234567890",
  role: "Software Engineer"
};

fetch('http://localhost:3000/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(sampleFormData)
})
  .then(response => response.json())
  .then(data => {
    console.log('✅ Success:', data);
    console.log('\n📧 Email should be sent to:', process.env.RECEIVER_EMAIL || 'vasanth.rasf@gmail.com');
    console.log('\n📝 Sample Form Data Submitted:');
    console.log(JSON.stringify(sampleFormData, null, 2));
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Error:', error);
    process.exit(1);
  });

