const discord = require("discord.js");
const shortHash = require("short-hash");
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const BountyInSettings = require("../models/bountyInSettings");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bounty_in")
    .setDescription("Register your public key with Bounty Bot, required to get approvals.")
    .addStringOption((option) =>
      option
      .setName("public_key")
      .setDescription("the message to echo")
      .setRequired(true)
    ),
    async excute(interaction) {
        const user = interaction.member;
        const pubKey = interaction.options.getString("public_key");

        const bounty_in = new BountyInSettings({
            userName: user,
            userPubKey: pubKey,
        });
        const embed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle(`**Registered sucessfully ✅**`)
        .setDescription(`${user} with Public Key:\n${pubKey} registerd sucessfully`)


        bounty_in.save(err => {
            if (err) {
              console.log(err);
              interaction.reply("Error saving user");
            }
            interaction.reply({embeds: [embed], ephemeral: true, });
          });
    },
};


// if user is alredy their => you are alredy registerd serr