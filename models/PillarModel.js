var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PillarSchema = new Schema({
	account_name: {type: String, required: true},
	industry: {type: String, required: true},
	industry_vertical: {type: String, required: true},
	id: {type:String,required:true},
}, {timestamps: true});

module.exports = mongoose.model("Pillars", PillarSchema);