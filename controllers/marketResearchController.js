const MarketResearch = require("../models/MarketResearchModel");
const { body,validationResult } = require("express-validator");
const { check } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
var mongoose = require("mongoose");
const Company = require("../models/CompaniesModel");

mongoose.set("useFindAndModify", false);

// MarketResearch Schema
function MarketResearchData(data) {
    this._id = data._id
    this.createdAt = data.createdAt;
    this.company = data.company,
	this.mbse= data.mbse,
    this.gdpr= data.gdpr,
    this.scm_track= data.scm_track,
    this.scm_prov= data.scm_prov,
    this.scm_sust= data.scm_sust,
    this.asset_track= data.asset_track,
    this.dpl= data.dpl,
    this.claims= data.claims,
    this.scm_dssa= data.scm_dssa,
    this.retail_lending= data.retail_lending,
    this.tokenization= data.tokenization,
    this.data_share= data.data_share,
    this.emp_health= data.emp_health,
    this.trade_assets= data.trade_assets,
    this.asset_track= data.asset_track,
    this.clinical_trails= data.clinical_trails,
    this.others= data.others, 
    this.total = data.total
}

/**
 * Market Research List.
 * 
 * @returns {Object}
 */
exports.MarketResearchList = [
	function (req, res) {
        console.log(req.body)
		try {
			MarketResearch.find().then((marketresearch)=>{
				if(marketresearch.length > 0){
					return apiResponse.successResponseWithData(res, "Operation success", marketresearch);
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
 * MarkertResearch Detail.
 * 
 * @param {string}      id
 * 
 * @returns {Object}
 */
exports.getMarketResearchById = [
	function (req, res) {
		if(!mongoose.Types.ObjectId.isValid(req.params.id)){
			return apiResponse.successResponseWithData(res, "Operation success", {});
		}
		try {
			MarketResearch.findOne({company: req.params.id}).then((mrd)=>{                
				if(mrd !== null){
					let mrdData = new MarketResearchData(mrd);
					return apiResponse.successResponseWithData(res, "Operation success", mrdData);
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
 * MarketResearch store.
 * 
 * @param {string}      id
 * @param {boolean}      sector
 * @param {boolean}      industry
 * @param {boolean}      industry_vertical 
 * @param {boolean}      sales_unit
 * @param {boolean}      area
 * @param {boolean}      subsidiary
 * 
 * @returns {Object}
 */
exports.addMarketResearch = [
	(req, res) => {
		try {
			const errors = validationResult(req.body);
            Company.findOne({id:req.body.id}).then((company) =>{
				var mrd = new MarketResearch(
					{
						company: company._id,
						others: true
					});

				if (!errors.isEmpty()) {
					return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
				}
				else {
					//Save company.
					mrd.save(function (err) {
						if (err) { return apiResponse.ErrorResponse(res, err); }
						let mrdData = new MarketResearchData(mrd);
						return apiResponse.successResponseWithData(res,"Market Research add Success.", mrdData);
					});
				}
			});
			//console.log(fetched_company);
		} catch (err) {
			console.log(err)
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * Market Research update.
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
exports.MarketResearchUpdate = [
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