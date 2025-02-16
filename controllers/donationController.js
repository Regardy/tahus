const { getDonations, saveDonation } = require("../models/Donation");

// Controller to fetch donations and send as JSON response
exports.getDonations = async (req, res) => {
  try {
    const donations = await getDonations();
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to save a new donation entry
exports.createDonation = async (req, res) => {
  const { name, amount, message } = req.body;
  try {
    const newDonation = { name, amount, message, timestamp: new Date() };
    await saveDonation(newDonation);
    res.status(200).json({ success: true, message: "Donation saved" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
