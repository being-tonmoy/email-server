// Vercel serverless function for health check
module.exports = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Email server is running',
    timestamp: new Date().toISOString()
  });
};
