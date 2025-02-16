module.exports = (req, res, next) => {
  const token = req.query.token;
  // Check if token is provided and valid
  if (!token || token !== process.env.SECRET_TOKEN) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  next(); // Proceed to next middleware or route handler
};
