const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getDonations } = require("../controllers/donationController");

// Define route to get donation list, protected with authentication middleware
router.get("/", auth, getDonations);

module.exports = router;
