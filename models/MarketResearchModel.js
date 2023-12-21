var mongoose = require("mongoose");
const CompaniesModel = require("./CompaniesModel");

var Schema = mongoose.Schema;
var MarketResearchSchema = new Schema({
    company: {type: mongoose.Schema.Types.ObjectId, ref: 'Company', required:true},
	mbse: {type: Boolean, default:false},
    gdpr: {type: Boolean, default:false},
    scm_track: {type: Boolean, default:false},
    scm_prov: {type: Boolean, default:false},
    scm_sust: {type: Boolean, default:false},
    asset_track: {type: Boolean, default:false},
    dpl: {type: Boolean, default:false},
    claims: {type: Boolean, default:false},
    scm_dssa: {type: Boolean, default:false},
    retail_lending: {type: Boolean, default:false},
    tokenization: {type: Boolean, default:false},
    data_share: {type: Boolean, default:false},
    emp_health: {type: Boolean, default:false},
    trade_assets: {type: Boolean, default:false},
    asset_track: {type: Boolean, default:false},
    clinical_trails: {type: Boolean, default:false},
    others: {type: Boolean, default:true}, 
    total: {type: Number, default: function(){
        return this.mbse+this.gdpr+this.scm_track+this.scm_dssa+this.scm_prov+this.scm_sust+this.asset_track+this.trade_assets
                +this.dpl+this.claims+this.retail_lending+this.tokenization+this.data_share+this.emp_health+this.clinical_trails+this.others
    }},

}, {timestamps: true});

module.exports = mongoose.model("MarketResearch", MarketResearchSchema);