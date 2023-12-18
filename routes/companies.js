var express = require("express");
const CompanyController = require("../controllers/CompaniesController");

var router = express.Router();

router.get("/", CompanyController.companiesList);
router.get("/:id", CompanyController.getCompanyById);
router.post("/", CompanyController.addCompany);
router.put("/:id", CompanyController.companyUpdate);
router.delete("/:id", CompanyController.companyDelete);

module.exports = router;