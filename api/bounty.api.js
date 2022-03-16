const express = require("express");
const router = express.Router();
const BountySettings = require("../models/bountySettings");

router.get("/:bountyId", async (req, res) => {
  const bountyId = req.params.bountyId;
  const data = await BountySettings.findOne({ bountyId });
  if (!data) {
    console.log("no data", data);
    return res.status(404).send("Unable to find the bounty");
  }
  res.json({ data });
});

router.put("/:bountyId", async (req, res) => {
  try {
    const bountyId = req.params.bountyId;
    const data = await BountySettings.findOneAndUpdate({ bountyId }, req.body);
    if (!data) {
      return res.status(404).send("Unable to find the bounty");
    }
    return res.json({ data });
  } catch (e) {
    return res.status(500).send("Cannot update");
  }
});

router.get("/", async (req, res) => {
  const bountyId = req.params.bountyId;
  const data = await BountySettings.find();
  if (!data.length) {
    return res.status(404).send("Unable to find the bounty");
  }
  res.json({ data });
});

module.exports = router;
