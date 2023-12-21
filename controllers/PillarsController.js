const PillarSchema = require("../models/PillarModel");
const { body,validationResult } = require("express-validator");
const { check } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

// Company Schema
function PillarData(data) {
    this._id = data._id;
    this.account_name= data.account_name;
    this.industry_vertical= data.industry_vertical;
    this.industry= data.industry;
    this.createdAt = data.createdAt;
}

/**
 * Book List.
 * 
 * @returns {Object}
 */
exports.pillarList = [
	function (req, res) {
        console.log(req)
		try {
			PillarSchema.find().then((companies)=>{
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
exports.getPillarById = [
	function (req, res) {
		if(!mongoose.Types.ObjectId.isValid(req.params.id)){
			return apiResponse.successResponseWithData(res, "Operation success", {});
		}
		try {
			PillarSchema.findOne({_id: req.params.id}).then((company)=>{
				if(company !== null){
					let companyData = new PillarData(company);
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
exports.addPillar = [
	/*body("account_name", "Company Name must not be empty.").isLength({ min: 1 }).trim().custom((value,{req}) => {
		return PillarSchema.findOne({account_name : value}).then(company => {
			if (company) {
				return Promise.reject("Company already exist with this name.");
			}
		});
	}),
	check("*").escape(),*/
	(req, res) => {
		try {
			const errors = validationResult(req);
			req.body.id = req.body.account_name;
			//console.log('Request body:', JSON.stringify(req.body, null, 2));

			//console.log(JSON.parse(req.body));
			console.log(req.body);

			var company = new PillarSchema(
				{
					account_name: req.body.account_name,
					"web3-dApps": req.body["web3-dApps"],
					"web3-SmartContract": req.body["web3-SmartContract"],
					"web3-NFTs":req.body["web3-NFTs"],
					hlf: req.body.hlf,
					sensor: req.body.sensor,
					vboard: req.body.vboard,
					vaas: req.body.vaas,
					carboncore: req.body.carboncore,
					giftcard: req.body.giftcard,
					tokenization: req.body.tokenization,
					web3loyalty: req.body.web3loyalty,
					id: req.body.id
				});

			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			else {
				//Save company.
				company.save(function (err) {
					if (err) { return apiResponse.ErrorResponse(res, err); }
					let companyData = new PillarData(company);
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
exports.pillarUpdate = [
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
			var company = new PillarSchema(
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
					PillarSchema.findById(req.params.id, function (err, foundCompany) {
						if(foundCompany === null){
							return apiResponse.notFoundResponse(res,"Company not exists with this id");
						}else{
							//Check authorized user
							if(foundCompany.user.toString() !== req.user._id){
								return apiResponse.unauthorizedResponse(res, "You are not authorized to do this operation.");
							}else{
								//update company.
								PillarSchema.findByIdAndUpdate(req.params.id, company, {},function (err) {
									if (err) { 
										return apiResponse.ErrorResponse(res, err); 
									}else{
										let companyData = new PillarData(company);
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
exports.pillarDelete = [
	function (req, res) {
		if(!mongoose.Types.ObjectId.isValid(req.params.id)){
			return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
		}
		try {
			PillarSchema.findById(req.params.id, function (err, foundCompany) {
				if(foundCompany === null){
					return apiResponse.notFoundResponse(res,"Company not exists with this id");
				}else{
					//Check authorized user
					if(foundCompany.user.toString() !== req.user._id){
						return apiResponse.unauthorizedResponse(res, "You are not authorized to do this operation.");
					}else{
						//delete company.
						PillarSchema.findByIdAndRemove(req.params.id,function (err) {
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