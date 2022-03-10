const mongoose = require("mongoose");

const BountySchema = new mongoose.Schema({
    bountyId: String,
    bountyTitle: String,
    bountyAmount: Number,
    bountyPaymentMethod: String,
    bountyTransactionStatus: String,
    bountyAcceptableBy: String,
    bountyServerId: String,
    bountyServerName: String,
    bountyTimestamp: String,

})



module.exports = mongoose.model("BountySettings", BountySchema);