const discord = require("discord.js");
const shortHash = require("short-hash");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const BountyInSettings = require("../models/bountyInSettings");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bounty_in")
    .setDescription(
      "Register your public key with Bounty Bot, required to get approvals."
    )
    .addStringOption((option) =>
      option
        .setName("public_key")
        .setDescription("your publickey to registered with Bounty Bot.")
        .setRequired(true)
    ),
  async excute(interaction) {
    const user = interaction.member;
    const pubKey = interaction.options.getString("public_key");

    const embed = new MessageEmbed()
      .setColor("GREEN")
      .setTitle(`**Registered sucessfully ✅**`)
      .setDescription(
        `${user} with Public Key:\n${pubKey} was registerd sucessfully`
      )
      .setFooter({ text: `Bounty Bot/💲` });

    await BountyInSettings.findOneAndUpdate(
      { userName: user },
      { userPubKey: pubKey },
      { upsert: true }
    );
    interaction.reply({ embeds: [embed] });
  },
};

// EnYqiB4AsV9dcihwCdcPrnE6fXZLNxYxfrzVG4CT2vR8
