const nodemailer = require('nodemailer');
const { applicationFormSubmissionTemplate } = require('../api/emailTemplates');

// Configure nodemailer with environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'ict@cu.ac.bd',
    pass: process.env.EMAIL_PASSWORD || 'ucui xflj auma rlww'
  }
});

// Set CORS headers helper
const setCorsHeaders = (res, origin) => {
  const allowedOrigins = [
    'https://cu-std-2nd-year.vercel.app',
    'http://localhost:3000',
    'http://localhost:3001'
  ];
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
};

const sendApplicationFormSubmission = async (formData, recipientEmail) => {
  const htmlContent = applicationFormSubmissionTemplate(formData);

  return transporter.sendMail({
    from: `"ICT Cell, University of Chittagong" <${process.env.EMAIL_USER || 'ict@cu.ac.bd'}>`,
    to: recipientEmail,
    subject: `Application Form Submission Confirmation - ${formData.studentId || 'Student'}`,
    html: htmlContent
  });
};

// Vercel serverless function for form submission email
module.exports = async (req, res) => {
  // Set CORS headers
  const origin = req.headers.origin;
  setCorsHeaders(res, origin);

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Use POST.'
    });
  }

  try {
    const { formData, recipientEmail } = req.body;

    // Validation
    if (!formData || !recipientEmail) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: formData and recipientEmail'
      });
    }

    if (!formData.studentId) {
      return res.status(400).json({
        success: false,
        message: 'formData must contain studentId'
      });
    }

    // Send email
    await sendApplicationFormSubmission(formData, recipientEmail);

    res.status(200).json({
      success: true,
      message: 'Application form submission email sent successfully',
      data: {
        recipientEmail,
        studentId: formData.studentId,
        sentAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error sending application form email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: error.message
    });
  }
};
