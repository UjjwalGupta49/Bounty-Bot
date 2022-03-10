const mongoose = require("mongoose");

const BountyInSchema = new mongoose.Schema({
    userName: String,
    userPubKey: String,
})



module.exports = mongoose.model("BountyInSettings", BountyInSchema);