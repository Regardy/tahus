const Donation = require("../models/Donation");

exports.getDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ timestamp: -1 }).limit(10);
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createDonation = async (req, res) => {
  const { name, amount, message } = req.body;
  try {
    const newDonation = new Donation({ name, amount, message });
    await newDonation.save();
    res.status(200).json({ success: true, message: "Donation saved" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
