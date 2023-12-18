var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CompanySchema = new Schema({
	account_name: {type: String, required: true},
	sector: {type: String, required: true},
	industry: {type: String, required: true},
	industry_vertical: {type: String, required: true},
    sales_unit: {type: String, required: true},
    area: {type: String, required: true},
    subsidiary: {type: String, required: true},

}, {timestamps: true});

module.exports = mongoose.model("Companies", CompanySchema);