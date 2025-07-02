const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Use modular routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/applications", require("./routes/applications"));
app.use("/api/companies", require("./routes/companies"));

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (error) {
    console.error("Failed to connect to DB:", error);
    process.exit(1);
  }
});
