// In code/server/email.js
const sgMail = require('@sendgrid/mail');

// Set the API key
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
} else {
  console.error("SENDGRID_API_KEY is not set in your .env file!");
}

// This MUST be the email you verified in SendGrid
const SENDER_EMAIL = '6singhrathore@gmail.com'; 
// !!! IMPORTANT: Change the email address above to the one you verified in Step 2.


// Function to send the OTP email
const sendEmailOTP = async (email, otp) => {
  if (!SENDGRID_API_KEY) {
    console.error("Email not sent. SENDGRID_API_KEY is missing.");
    return false;
  }
  if (SENDER_EMAIL === 'your-verified-email@gmail.com') {
    console.error("Email not sent. Please update SENDER_EMAIL in code/server/email.js");
    return false;
  }


  const msg = {
    to: email, // The user's email
    from: SENDER_EMAIL, // Your verified sender email
    subject: 'Your Bookify Login Code',
    text: `Your one-time login code is: ${otp}`,
    html: `<b>Your one-time login code is: ${otp}</b><p>This code will expire in 10 minutes.</p>`,
  };

  try {
    await sgMail.send(msg);
    console.log(`Email sent successfully to ${email}`);
    return true;
  } catch (error) {
    console.error("Error sending SendGrid email:", error);
    if (error.response) {
      console.error(error.response.body)
    }
    return false;
  }
};

module.exports = { sendEmailOTP };
