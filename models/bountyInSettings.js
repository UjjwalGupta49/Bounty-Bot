const mongoose = require("mongoose");

const BountyInSchema = new mongoose.Schema({
    userName: String,
    userPubKey: String,
    userBounties: {},  // structure =>  {"id": "status"} or {bountyId: {completionStatus: boolean, bountyId: String}} // status => accepted, completed, created
})



module.exports = mongoose.model("BountyInSettings", BountyInSchema);