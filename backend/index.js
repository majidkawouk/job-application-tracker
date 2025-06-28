const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const applicationController = require("./controllers/applicationsController");
const authController = require("./controllers/authController");
const companyController = require("./controllers/companyController");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Start server
app.listen(PORT, async () => {
  try {
    await connectDB(); // Optional: connect once when starting
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (error) {
    console.error("Failed to connect to DB:", error);
    process.exit(1); // stop app if DB fails
  }
});
