const discord = require("discord.js");
const { Client, Intents, Collection } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const {REST} = require("@discordjs/rest");
const fs = require("fs");
const WOKCommands = require("wokcommands");
var shortHash = require("short-hash");
const dotenv = require("dotenv");
const path = require('path');
// const {bountyHelp, helpEmbed} = require('./src/bountyHelp.js');
dotenv.config();

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// https://discord.com/api/oauth2/authorize?client_id=946011776594636830&permissions=517544598720&scope=bot%20applications.commands
// This link will people to add bot to server
// Token: OTQ2MDExNzc2NTk0NjM2ODMw.YhYgHw.RDkX_F_e8i4-d54iKydqaBo7VUw Don't give to anyone else

client.on("ready", () => {
  console.log("Bounty bot is online! 🚀");
  client.user.setActivity("Bounties /💲", { type: "WATCHING"  });
  // new WOKCommands(client, {
  //   commandsDir: path.join(__dirname, './commands'),
  //   typeScript: true,
  //   testServers: ["785428302114455592"],
  // })
});

const makeBounty = async (interaction: any, allOptions : Array<`T`>) => {
  const dateTime = new Date().toLocaleString();

  const title = allOptions[0];
  const breif = String(allOptions[1]);
  const description = allOptions[2];
  const payment_method = allOptions[3];
  const reward = allOptions[4];
  let attachment_link = String(allOptions[5]);


  const uniqueId = shortHash(
    `The bounty is to create a metaverse and then blow it up, you get paid for both!` +
      Date.now()
  );
  console.log(dateTime);
  console.log(typeof(attachment_link));
  if (attachment_link === "null") {
    attachment_link = "   🏁   ";
  }

  const embed = new discord.MessageEmbed()
    .setColor("GREEN")
    .setTitle(`**${title}**`)
    .setAuthor({
      name: interaction.member.displayName,
      iconURL: interaction.member.displayAvatarURL(),
    })
    .setDescription(breif)

    .setTimestamp()
    .addFields(
      {
        name: "Description",
        value: description,
      },
      { name: "Reward", value: `${reward} ${payment_method}`, inline: true },
      { name: "Attachment", value: attachment_link, inline: true }
    )
    .setFooter({ text: `${uniqueId}` });
  interaction.applicationId = uniqueId;

  await interaction.channel.send({ embeds: [embed] });
  await interaction.member.createDM().then((dm:any) => {
    dm.send(`You created a bounty ${uniqueId}, at ${dateTime}`);
  });
};

const helpEmbed = async (interaction:any) => {
  const embed = new discord.MessageEmbed()
    .setColor("GREEN")
    .setTitle(`**Bounty Bot**`)
    .addFields(
      {name: '```/bounty```', value: "Create a bounty by providing required feilds"}
      )
  await interaction.channel.send({ embeds: [embed] });

};

// const guildId = "785428302114455592"; //785428302114455592
// const guild = client.guilds.cache.get(guildId);
// let commands; // holds the guild command manager

// if (guild) {
//   commands = guild.commands;
// } else {
//   commands = client.application?.commands;
// }

// commands?.create(
//   {name: "bounty", description: "Create a bounty"},
// )


// const commandFiles = fs.readdirSync(path.join(__dirname, "./commands")).filter(file => file.endsWith(".js"));

client.on("messageCreate", () => {
  const guildId = "785428302114455592"; //785428302114455592
  const guild = client.guilds.cache.get(guildId);
  let commands:any; // holds the guild command manager

  if (guild) {
    commands = guild.commands;
  } else {
    commands = client.application?.commands;
  }

  commands?.create(
    // bountyCreate

    {
      name: "bounty",
      description: "Create a bounty",
      options: [
        {
          name: "title",
          description: "The title of the bounty",
          required: true,
          type: discord.Constants.ApplicationCommandOptionTypes.STRING,
        },
        {
          name: "breif",
          description: "One line description of the bounty",
          required: true,
          type: discord.Constants.ApplicationCommandOptionTypes.STRING,
        },
        {
          name: "description",
          description: "The description of the bounty",
          required: true,
          type: discord.Constants.ApplicationCommandOptionTypes.STRING,
        },
        {
          name: "payment_method",
          description: "USDC or SOL",
          required: true,
          type: discord.Constants.ApplicationCommandOptionTypes.STRING,
        },
        {
          name: "reward",
          description: "The amount of sto be paid",
          required: true,
          type: discord.Constants.ApplicationCommandOptionTypes.NUMBER,
        },
        {
          name: "attachment_link",
          description: "Link to attachment",
          required: false,
          type: discord.Constants.ApplicationCommandOptionTypes.STRING,
        },
      ],
    }
  );
  commands?.create({
    name: "add",
    description: "Add two numbers",
    options: [
      {
        name: "number1", // no spaces should be there in option name
        description: "The first number",
        required: true,
        type: discord.Constants.ApplicationCommandOptionTypes.NUMBER,
      },
      {
        name: "number2",
        description: "The second number",
        required: true,
        type: discord.Constants.ApplicationCommandOptionTypes.NUMBER,
      },
    ],
  });

  commands?.create({
    name: "help",
    description: "Help command, walkthough to all commands",
  });
});

/*Types of Slash command
  Guild based
  Global
*/

// 785428302114455592

client.on("interactionCreate", async (interaction:any) => {
  if (!interaction.isCommand()) {
    return;
  }
  const { commandName, options } = interaction;

  if (commandName === "bounty") {
    const allOptions = [
      options.getString("title"),
      options.getString("breif"),
      options.getString("description"),
      options.getString("payment_method"),
      options.getNumber("reward"),
      options.getString("attachment_link"),
    ];
    await makeBounty(interaction, allOptions);
    interaction.reply({
      content: "DM send to you!",
    });
  } else if (commandName === "help") {
    await interaction.reply({content: "List of all available commands ~ By Bounty Bot."})
    helpEmbed(interaction);
  }
});

client.login(process.env.TOKEN);
