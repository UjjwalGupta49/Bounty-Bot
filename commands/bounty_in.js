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

    BountyInSettings.findOne({ userName: user })
      .then((result) => {
        if (result) {
          result.publicKey = pubKey;
          result.save();
          interaction.reply({ embeds: [embed] });
        } else {
          const newBountyIn = new BountyInSettings({
            userName: user,
            userPubKey: pubKey,
          });
          newBountyIn.save();
          interaction.reply({ embeds: [embed] });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

// EnYqiB4AsV9dcihwCdcPrnE6fXZLNxYxfrzVG4CT2vR8
