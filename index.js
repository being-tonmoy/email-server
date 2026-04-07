// Main entry point for the email server
const app = require('./api/email');

// Only start listening if not on Vercel (Vercel handles server startup)
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`📧 Email server running on port ${PORT}`);
  });
}

// Export app for Vercel
module.exports = app;
