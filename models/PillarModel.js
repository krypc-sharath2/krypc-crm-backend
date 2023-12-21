var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Web3 = new Schema({dApps:{type: Boolean},SmartContract:{type: Boolean},NFTs:{type: Boolean}},{ _id: false });
var hlf = {permissionedBlockchain:{type: Boolean},supplychain:{type: Boolean},ssi:{type: Boolean},deFi:{type: Boolean}};
var vboard = {assistedVideoInteractions:{type: Boolean},kyc:{type: Boolean},onboarding:{type: Boolean},selfAssistedModel:{type: Boolean},trainingAndEducationalSessions:{type: Boolean},
	productDesignAndProto:{type: Boolean},customerMapping:{type: Boolean},};
var sensor = {cryptoTxnAnalysis:{type: Boolean},fraudDetection:{type: Boolean},complianceMonitoring:{type: Boolean},securityAuditing:{type: Boolean},
	cryptoForensicInvestigation:{type: Boolean},amlCompliance:{type: Boolean},darkWebMonitoring:{type: Boolean}};
var vaas = {documentVerification:{type: Boolean},kycCompliance:{type: Boolean},identityDocAuthentication:{type: Boolean},legalDocVerification:{type: Boolean},financialTxnVerification:{type: Boolean},
empBackgroundChecks:{type: Boolean},healthRecordsAuthentication:{type: Boolean},educationalCV:{type: Boolean}};
var carboncore = {carbonFootprint:{type: Boolean},susReporting:{type: Boolean},envImpactAssessments:{type: Boolean},energyConsumptionMonitor:{type: Boolean}};
var giftcard = {customizedGCProgram:{type: Boolean},employeeRewards:{type: Boolean},customerLoyalty:{type: Boolean}};
var tokenization = {realEstate:{type: Boolean},ArtCollectibles:{type: Boolean},fractionalOwnerOfHVA:{type: Boolean},intellectualProperty:{type: Boolean}};
var web3loyalty = {blockchainCustomerRewards:{type: Boolean},decentralizedLoyalty:{type: Boolean},NFTLoyalty:{type: Boolean},gamifiedLoyalty:{type: Boolean}};
const PillarSchema = new Schema({
	account_name: {type: String, required: true},
	//"web3":{
		"web3-dApps":{type: Boolean , label: "dApps", required: false},
		"web3-SmartContract":{type: Boolean , required: false},
		"web3-NFTs":{type: Boolean , required: false},
	//},
	hlf: {permissionedBlockchain:{type: Boolean},supplychain:{type: Boolean},ssi:{type: Boolean},deFi:{type: Boolean}},
	sensor: {assistedVideoInteractions:{type: Boolean},kyc:{type: Boolean},onboarding:{type: Boolean},selfAssistedModel:{type: Boolean},
		trainingAndEducationalSessions:{type: Boolean},
		productDesignAndProto:{type: Boolean},customerMapping:{type: Boolean}},
	vboard: {assistedVideoInteractions:{type: Boolean},kyc:{type: Boolean},onboarding:{type: Boolean},selfAssistedModel:{type: Boolean},trainingAndEducationalSessions:{type: Boolean},
		productDesignAndProto:{type: Boolean},customerMapping:{type: Boolean}},
	vaas: vaas,
	carboncore: carboncore,
	giftcard: giftcard,
	tokenization: tokenization,
	web3loyalty: {blockchainCustomerRewards:{type: Boolean},decentralizedLoyalty:{type: Boolean},NFTLoyalty:{type: Boolean},gamifiedLoyalty:{type: Boolean}},
	id: {type:String,required:true},
}, {timestamps: true});

module.exports = mongoose.model("Pillars", PillarSchema);