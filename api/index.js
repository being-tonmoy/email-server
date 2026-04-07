// Root endpoint
module.exports = (req, res) => {
  res.status(200).json({
    message: "Hello human. This is a basic Email Server created by Brainless Loco"
  });
};
