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

// Vercel serverless function for health check
module.exports = (req, res) => {
  // Set CORS headers
  const origin = req.headers.origin;
  setCorsHeaders(res, origin);

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  res.status(200).json({
    success: true,
    message: 'Email server is running',
    timestamp: new Date().toISOString()
  });
};
