const { getDonations, saveDonation } = require("../models/Donation");

exports.getDonations = async (req, res) => {
  try {
    const donations = await getDonations();
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
