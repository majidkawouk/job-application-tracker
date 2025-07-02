const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");

router.post("/", companyController.CreateCompany);
router.delete("/:id", companyController.DeleteCompany);
router.get("/:user_id", companyController.getallcompaniesByid);

module.exports = router;
