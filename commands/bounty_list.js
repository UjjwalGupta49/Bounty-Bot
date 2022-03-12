const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const BountySettings = require("../models/bountySettings");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bounty_list")
    .setDescription("List of all active bounties"),
  async excute(interaction) {
    const embed = new MessageEmbed()
      .setColor("GREEN")
      .setTitle(`**Active Bounties 🏁**`)
      .setDescription(`List of all active bounties in your sever.`)
      .setFooter({ text: `Bounty Bot/💲` });

    BountySettings.find()
      .then((result) => {
        result.forEach((element) => { // have to make it visible as per server, // restructure the database to prioritize server ID
          if (element.bountyServerId == interaction.guild.id) {
            if (element.bountyStatus === "Active") { // bountyServerId
                embed.addFields(
                    { name: `${element.bountyTitle}`, value: `Id: ${element.bountyId}, Reward: ${element.bountyAmount} ${element.bountyPaymentMethod}` }
                );  
            }
        }});

        interaction.reply({ embeds: [embed] });
      })

      .catch((err) => {
        console.log(err);
      });
  },
};

// EnYqiB4AsV9dcihwCdcPrnE6fXZLNxYxfrzVG4CT2vR8
