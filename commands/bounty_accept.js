const discord = require("discord.js");
const shortHash = require("short-hash");
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const BountySettings = require("../models/bountySettings");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bounty_accept")
    .setDescription("Accept a bounty and start working on it!")
    .addStringOption((option) =>
      option
      .setName("bounty_id")
      .setDescription("Bounty ID, you want to work on.")
      .setRequired(true)
    ),

    async excute(interaction) {
        const user = interaction.member;
        const bounty_id = interaction.options.getString("bounty_id");
        const bountyFind = await BountySettings.findOne({ bountyId: bounty_id });
        if (bountyFind) {
            if (BountySettings.findOne({ bountyId: bounty_id, bountyContributors: user })) {
                const embed = new discord.MessageEmbed()
                .setColor("RED")
                .setTitle("Alredy registered")
                .setDescription("You are already registered for this bounty serr.")
                .setFooter({ text: `Bounty Bot/💲` });
                interaction.reply({embeds: [embed]})
            } else {
                await BountySettings.updateOne({ bountyId: bounty_id }, { $push: { bountyContributors: `${user}` } });
                const embed = new MessageEmbed()
                    .setColor("GREEN")
                    .setTitle(`**Accepted sucessfully ✅**`)
                    .setDescription(
                        `${user} accepted the bounty ${bounty_id}`
                    )
                    .setFooter({ text: `Bounty Bot/💲` });
                interaction.reply({ embeds: [embed] });
            }

        }
        else {
            const embed = new MessageEmbed()
                .setColor("RED")
                .setTitle(`**Bounty not found ❌**`)
                .setDescription(
                    `${interaction.member} could not find bounty ${bounty_id}`
                )
                .setFooter({ text: `Bounty Bot/💲` });
            interaction.reply({ embeds: [embed] });
        }
    },
};

 

