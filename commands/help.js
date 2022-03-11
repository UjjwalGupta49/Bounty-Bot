const discord = require("discord.js");
const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("list of commands for Bounty Bot"),
    async excute(interaction) {
        const embed = new discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("Bounty Bot")
        .addFields(
          {name: '```/bounty```', value: "Create a bounty by providing required feilds."},
          {name: '```/bounty list```' , value: "Show all active bounties."},
          {name: '```/bounty accept <id>```' , value: "Accept a bounty and start working on it!"},
          {name: '```/bounty in <pub-key>```' , value: "Register your public key with Bounty Bot, **required to get approvals.**"},
          {name: '```/bounty status <id>```' , value: "Check status of the bounty."},
          {name: '```/bounty approve <id> <username>```' , value: "Approve bounty for submissions\nOnly availabe for bounty creators."},
        )
        .setFooter({ text: `Bounty Bot/💲` });

  
        interaction.reply({content: "List of commands for Bounty Bot", embeds: [embed] });
    }

    

}