const application = require("../models/Applications");

exports.findAllApplicationsbyId = async (req, res) => {
  try {
    const userId = req.params.id;
    const applications = await application.findAllApplicationsbyId(userId);
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error });
  }
};

exports.createApplication = async (req, res) => {
  try {
    const applicationData = req.body;
    const newApplicationId = await application.createApplication(
      applicationData
    );
    res.status(201).json({
      message: "Application created successfully",
      id: newApplicationId,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating application", error });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const deleted = await application.deleteApplication(applicationId);
    if (deleted) {
      res.status(200).json({ message: "Application deleted successfully" });
    } else {
      res.status(404).json({ message: "Application not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting application", error });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status, application_Id } = req.params;
    if (!status || !application_Id) {
      return res
        .status(400)
        .json({ message: "Status and application ID are required" });
    }
    const updated = await application.updateApplicationStatus(
      application_Id,
      status
    );
    if (updated) {
      res
        .status(200)
        .json({ message: "Application status updated successfully" });
    } else {
      res.status(404).json({ message: "Application not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating application status", error });
  }
};
