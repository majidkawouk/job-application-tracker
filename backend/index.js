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


app.post("/api/login", authController.login);
app.post("/api/register", authController.register);
app.post("/api/applications", applicationController.createApplication);
app.get("/api/applications/:id", applicationController.findAllApplicationsbyId);
app.delete("/api/applications/:id", applicationController.deleteApplication);
app.put("/api/applications/:application_Id/:status", applicationController.updateApplicationStatus);
app.post("/api/companies", companyController.CreateCompany);
app.delete("/api/companies/:id", companyController.DeleteCompany);

// Start server
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (error) {
    console.error("Failed to connect to DB:", error);
    process.exit(1); // stop app if DB fails
  }
});
