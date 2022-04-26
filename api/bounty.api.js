const express = require("express");
const router = express.Router();
const BountySettings = require("../models/bountySettings");
const client  = require("../discord-config");
const { MessageEmbed } = require('discord.js');

router.get("/:bountyId", async (req, res) => {
  const bountyId = req.params.bountyId;
  const data = await BountySettings.findOne({ bountyId });
  if (!data) {
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

router.post("/publish/:bountyId", async (req, res) => {
  const bountyId = req.params.bountyId;
  const {guildId} = req.body;
  const data = await BountySettings.findOne({bountyId});
  let title, description, reward, uniqueId, paymentMethod, author
  if (!data) {
    return res.json({});
  }

    title = data.bountyTitle
    description = data.bountyDescription
    reward = data.bountyAmount
    paymentMethod = data.bountyPaymentMethod
    author = data.bountyAuthor
    uniqueId = data.bountyId
  const bountyChannel = client.channels.cache.find((channel) => {
    return channel.name === "bounties";
  });
  const bountyEmbed  = new MessageEmbed()
  .setColor("GREEN")
  .setTitle(`**A New Bounty Published**`)
  .setDescription(`${author} created a bounty for ${title} and reward: ${reward}, ${paymentMethod}\n The bounty Id is ${uniqueId}`)
  .setFooter({ text: `Bounty Bot/💲` });

  bountyChannel.send({content: 'New bounty has been published!!', embeds: [bountyEmbed]})
  res.json({ data: "published the message in bounties channel" });
});

module.exports = router;
