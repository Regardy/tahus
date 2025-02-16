module.exports = (req, res, next) => {
  const token = req.query.token;
  if (!token || token !== process.env.SECRET_TOKEN) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  next();
};
