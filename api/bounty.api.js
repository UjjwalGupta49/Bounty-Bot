const express = require("express");
const router = express.Router();
const BountySettings = require("../models/bountySettings");

router.get("/:bountyId", async (req, res) => {
  const bountyId = req.params.bountyId;
  const data = await BountySettings.findOne({ bountyId });
  res.json({ data });
});

router.put("/:bountyId", async (req, res) => {
  try {
    const bountyId = req.params.bountyId;
    const data = await BountySettings.findOneAndUpdate({ bountyId }, req.body);
    return res.json({ data });
  } catch (e) {
    return res.status(500).send("Cannot update");
  }
});

router.get("/", async (req, res) => {
  const bountyId = req.params.bountyId;
  const data = await BountySettings.find();
  res.json({ data });
});

module.exports = router;
