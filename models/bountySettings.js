const mongoose = require("mongoose");

const BountySchema = new mongoose.Schema({
    bountyId: String,
    bountyTitle: String,
    bountyBrief: String,
    bountyDescription: String,
    bountyAmount: Number,
    bountyPaymentMethod: String,
    bountyStatus: String,
    bountyAttachment: String,
    bountyAcceptableBy: String,
    bountyServerId: String,
    bountyServerName: String,
    bountyTimestamp: String,

})



module.exports = mongoose.model("BountySettings", BountySchema);