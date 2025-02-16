const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { createDonation } = require("../controllers/donationController");

// Webhook route to handle incoming donations from Saweria
router.post("/saweria", auth, createDonation);

module.exports = router;
