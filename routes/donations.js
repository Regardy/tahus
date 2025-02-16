const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getDonations } = require("../controllers/donationController");

router.get("/", auth, getDonations);

module.exports = router;
