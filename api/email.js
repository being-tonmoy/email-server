const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { applicationFormSubmissionTemplate } = require('./emailTemplates');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configure nodemailer with environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'ict@cu.ac.bd',
    pass: process.env.EMAIL_PASSWORD || 'ucui xflj auma rlww'
  }
});

// ==================== EMAIL TEMPLATES ====================
// Templates are now separated in emailTemplates.js component

// ==================== EMAIL SENDING HANDLERS ====================

/**
 * Send application form submission confirmation email
 */
const sendApplicationFormSubmission = async (formData, recipientEmail) => {
  const htmlContent = applicationFormSubmissionTemplate(formData);

  return transporter.sendMail({
    from: `"ICT Cell, University of Chittagong" <${process.env.EMAIL_USER || 'ict@cu.ac.bd'}>`,
    to: recipientEmail,
    subject: `Application Form Submission Confirmation - ${formData.studentId || 'Student'}`,
    html: htmlContent
  });
};

// ==================== REST API ROUTES ====================

/**
 * Health Check Endpoint
 * GET /api/health
 */
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'Email server is running',
    timestamp: new Date().toISOString()
  });
});

/**
 * Send Application Form Submission Confirmation Email
 * POST /api/email/application-form/submit
 * 
 * Request Body:
 * {
 *   "formData": { ...student form data },
 *   "recipientEmail": "student@example.com"
 * }
 */
app.post('/api/email/application-form/submit', async (req, res) => {
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
});

/**
 * Generic Email Endpoint (for future email types)
 * POST /api/email/send
 * 
 * Request Body:
 * {
 *   "type": "application-form-submission",
 *   "formData": { ...data },
 *   "recipientEmail": "student@example.com"
 * }
 */
app.post('/api/email/send', async (req, res) => {
  try {
    const { type, formData, recipientEmail } = req.body;

    if (!type || !formData || !recipientEmail) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: type, formData, and recipientEmail'
      });
    }

    let result;

    switch (type) {
      case 'application-form-submission':
        result = await sendApplicationFormSubmission(formData, recipientEmail);
        break;
      
      // Add more email types here in the future
      // case 'registration-confirmation':
      //   result = await sendRegistrationConfirmation(formData, recipientEmail);
      //   break;
      
      default:
        return res.status(400).json({
          success: false,
          message: `Unknown email type: ${type}`
        });
    }

    res.status(200).json({
      success: true,
      message: `${type} email sent successfully`,
      data: {
        type,
        recipientEmail,
        sentAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error(`Error sending ${req.body.type} email:`, error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: error.message
    });
  }
});

// ==================== ERROR HANDLERS ====================

/**
 * 404 Handler
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    availableEndpoints: [
      'GET /api/health',
      'POST /api/email/application-form/submit',
      'POST /api/email/send'
    ]
  });
});

/**
 * Global Error Handler
 */
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ==================== START SERVER ====================

// Only start server locally, not on Vercel (which handles server management)
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`📧 Email server running on port ${PORT}`);
    console.log(`Health check: GET http://localhost:${PORT}/api/health`);
    // console.log(`API routes:`);
    // console.log(`  POST http://localhost:${PORT}/api/email/application-form/submit`);
    // console.log(`  POST http://localhost:${PORT}/api/email/send`);
  });
}

module.exports = app;
