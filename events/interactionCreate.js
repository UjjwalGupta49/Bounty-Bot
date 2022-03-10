module.exports = {
  name: "interactionCreate",
  once: false,
  async execute(interaction) {
    if (!interaction.isCommand()) {
      return;
    }

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.excute(interaction);
    } catch (err) {
      if (err) {
        console.log(err);
      }
      await interaction.reply({
        content: "Error occured!",
      });

    }
  },
};
