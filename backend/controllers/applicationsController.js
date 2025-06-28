const application = require('../models/applications');

exports.findAllApplicationsbyId = async (req, res) => {
  try {
    const userId = req.body.userId; // Assuming user ID is stored in req.body
    const applications = await application.findAllApplicationsbyId(userId);
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications', error });
  }
}

exports.createApplication = async (req, res) => {
  try {
    const applicationData = req.body; // Assuming application data is sent in the request body
    const newApplicationId = await application.createApplication(applicationData);
    res.status(201).json({ message: 'Application created successfully', id: newApplicationId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating application', error });
  }
}
exports.deleteApplication = async (req, res) => {
  try {
    const applicationId = req.body.id; // Assuming application ID is passed in the request body
    const deleted = await application.deleteApplication(applicationId);
    if (deleted) {
      res.status(200).json({ message: 'Application deleted successfully' });
    } else {
      res.status(404).json({ message: 'Application not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting application', error });
  }
}

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId, status } = req.body; // Assuming application ID and status are passed in the request body
    const updated = await application.updateApplicationStatus(applicationId, status);
    if (updated) {
      res.status(200).json({ message: 'Application status updated successfully' });
    } else {
      res.status(404).json({ message: 'Application not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating application status', error });
  }
}