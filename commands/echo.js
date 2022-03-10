const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("echo")
        .setDescription("Replies with pong")
        .addStringOption((option) =>
            option
            .setName("echo_message")
            .setDescription("the message to echo")
            .setRequired(true)),
    async excute(interaction) {
        const input = interaction.options.getString("echo_message");
        interaction.reply(input);
    }

}