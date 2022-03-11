const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const BountySettings = require("../models/bountySettings");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bounty_status")
    .setDescription("Check the status of a bounty")
    .addStringOption((option) =>
    option
    .setName("bounty_id")
    .setDescription("Id of the bounty tou are looking for")
    .setRequired(true)
  ),
  async excute(interaction) {
    const bountyId = interaction.options.getString("bounty_id");

    BountySettings.findOne({ bountyId: bountyId })
      .then((result) => {
        const embed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle(`**${result.bountyTitle}**`)
        .addFields({name: `Bounty`, value: `Status: ${result.bountyStatus}, Amount: ${result.bountyAmount} ${result.bountyPaymentMethod}`});

        interaction.reply({ embeds: [embed] });
        })
      .catch((err) => {
        console.log(err);
      });
  },
};

// EnYqiB4AsV9dcihwCdcPrnE6fXZLNxYxfrzVG4CT2vR8
