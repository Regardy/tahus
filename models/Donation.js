const mongoose = require("mongoose");

const DonationSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Donation", DonationSchema);
