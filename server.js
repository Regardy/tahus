require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { createClient } = require("@supabase/supabase-js");

// Importing route handlers
const donationRoutes = require("./routes/donations");
const webhookRoutes = require("./routes/webhook");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse JSON request bodies

// Route definitions
app.use("/donations", donationRoutes);
app.use("/webhook", webhookRoutes);
app.use(express.static("public")); // Serve static files from 'public' directory

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
