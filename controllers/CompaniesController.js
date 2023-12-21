const Companies = require("../models/CompaniesModel");
const { body,validationResult } = require("express-validator");
const { check } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

// Company Schema
function CompaniesData(data) {
    this._id = data._id;
    this.account_name= data.account_name;
    this.sector= data.sector;
    this.industry_vertical= data.industry_vertical;
    this.sales_unit= data.sales_unit;
    this.area= data.area;
    this.industry= data.industry;
    this.createdAt = data.createdAt;
}

/**
 * Book List.
 * 
 * @returns {Object}
 */
exports.companiesList = [
	function (req, res) {
        console.log(req.body)
		try {
			Companies.find().then((companies)=>{
				if(companies.length > 0){
					return apiResponse.successResponseWithData(res, "Operation success", companies);
				}else{
					return apiResponse.successResponseWithData(res, "Operation success", []);
				}
			});
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * Company Detail.
 * 
 * @param {string}      id
 * 
 * @returns {Object}
 */
exports.getCompanyById = [
	function (req, res) {
		if(!mongoose.Types.ObjectId.isValid(req.params.id)){
			return apiResponse.successResponseWithData(res, "Operation success", {});
		}
		try {
			Companies.findOne({_id: req.params.id}).then((company)=>{                
				if(company !== null){
					let companyData = new CompaniesData(company);
					return apiResponse.successResponseWithData(res, "Operation success", companyData);
				}else{
					return apiResponse.successResponseWithData(res, "Operation success", {});
				}
			});
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * Companies store.
 * 
 * @param {string}      account_name
 * @param {string}      sector
 * @param {string}      industry
 * @param {string}      industry_vertical 
 * @param {string}      sales_unit
 * @param {string}      area
 * @param {string}      subsidiary
 * 
 * @returns {Object}
 */
exports.addCompany = [
	body("industry", "Industry must not be empty").isLength({ min: 1 }).trim(),
	body("sector", "Company sector must not be empty.").isLength({ min: 1 }).trim(),
    body("industry_vertical", "Industry Vertical must not be empty.").isLength({ min: 1 }).trim(),
    body("sales_unit", "Sales unit must not be empty.").isLength({ min: 1 }).trim(),
    body("area", "Area must not be empty.").isLength({ min: 1 }).trim(),
	body("account_name", "Company Name must not be empty.").isLength({ min: 1 }).trim().custom((value,{req}) => {
		return Companies.findOne({account_name : value}).then(company => {
			if (company) {
				return Promise.reject("Company already exist with this name.");
			}
		});
	}),
	check("*").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);
			var company = new Companies(
				{ account_name: req.body.account_name,
					sector: req.body.sector,
					industry_vertical: req.body.industry_vertical,
					sales_unit: req.body.sales_unit,
                    area: req.body.area,
                    industry: req.body.industry,
                    subsidiary: req.body.subsidiary,
					id:req.body.account_name,
				});

			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			else {
				//Save company.
				company.save(function (err) {
					if (err) { return apiResponse.ErrorResponse(res, err); }
					let companyData = new CompaniesData(company);
					return apiResponse.successResponseWithData(res,"Company add Success.", companyData);
				});
			}
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * Company update.
 * 
 * @param {string}      account_name
 * @param {string}      sector
 * @param {string}      industry
 * @param {string}      industry_vertical 
 * @param {string}      sales_unit
 * @param {string}      area
 * @param {string}      subsidiary
 * 
 * @returns {Object}
 */
exports.companyUpdate = [
	body("industry", "Industry must not be empty").isLength({ min: 1 }).trim(),
	body("sector", "Company sector must not be empty.").isLength({ min: 1 }).trim(),
    body("industry_vertical", "Industry Vertical must not be empty.").isLength({ min: 1 }).trim(),
    body("sales_unit", "Sales unit must not be empty.").isLength({ min: 1 }).trim(),
    body("area", "Area must not be empty.").isLength({ min: 1 }).trim(),
	body("account_name", "Company Name must not be empty.").isLength({ min: 1 }).trim(),
	check("*").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);
			var company = new Companies(
				{ account_name: req.body.account_name,
					sector: req.sector,
					industry_vertical: req.body.industry_vertical,
					sales_unit: req.body.sales_unit,
                    area: req.body.area,
                    industry: req.body.industry,
                    user: req.user
				});

			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			else {
				if(!mongoose.Types.ObjectId.isValid(req.params.id)){
					return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
				}else{
					Companies.findById(req.params.id, function (err, foundCompany) {
						if(foundCompany === null){
							return apiResponse.notFoundResponse(res,"Company not exists with this id");
						}else{
							//Check authorized user
							if(foundCompany.user.toString() !== req.user._id){
								return apiResponse.unauthorizedResponse(res, "You are not authorized to do this operation.");
							}else{
								//update company.
								Companies.findByIdAndUpdate(req.params.id, company, {},function (err) {
									if (err) { 
										return apiResponse.ErrorResponse(res, err); 
									}else{
										let companyData = new CompaniesData(company);
										return apiResponse.successResponseWithData(res,"Company update Success.", companyData);
									}
								});
							}
						}
					});
				}
			}
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * Company Delete.
 * 
 * @param {string}      id
 * 
 * @returns {Object}
 */
exports.companyDelete = [
	function (req, res) {
		if(!mongoose.Types.ObjectId.isValid(req.params.id)){
			return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
		}
		try {
			Companies.findById(req.params.id, function (err, foundCompany) {
				if(foundCompany === null){
					return apiResponse.notFoundResponse(res,"Company not exists with this id");
				}else{
					//Check authorized user
					if(foundCompany.user.toString() !== req.user._id){
						return apiResponse.unauthorizedResponse(res, "You are not authorized to do this operation.");
					}else{
						//delete company.
						Companies.findByIdAndRemove(req.params.id,function (err) {
							if (err) { 
								return apiResponse.ErrorResponse(res, err); 
							}else{
								return apiResponse.successResponse(res,"Company delete Success.");
							}
						});
					}
				}
			});
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];