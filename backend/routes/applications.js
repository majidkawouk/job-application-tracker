const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationsController");

router.post("/", applicationController.createApplication);
router.get("/:id", applicationController.findAllApplicationsbyId);
router.delete("/:id", applicationController.deleteApplication);
router.put("/:application_Id/:status", applicationController.updateApplicationStatus);

module.exports = router;
