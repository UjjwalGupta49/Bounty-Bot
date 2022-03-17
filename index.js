const { Client, Intents, Collection } = require("discord.js");
const Database = require("./config/Database");
const express = require("express");
const bodyParser = require("body-parser");
const bountyRoutes = require("./api/bounty.api");

const db = new Database();
db.connect();
const app = express();

const fs = require("fs");
const dotenv = require("dotenv");
const path = require("path");
// const {bountyHelp, helpEmbed} = require('./src/bountyHelp.js');
dotenv.config();

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// https://discord.com/api/oauth2/authorize?client_id=946011776594636830&permissions=517544598720&scope=bot%20applications.commands

const commandFiles = fs
  .readdirSync(path.join(__dirname, "./commands"))
  .filter((file) => file.endsWith(".js"));

const commands = [];

client.commands = new Collection();

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data);
  // JSON.stringify(command.data);
  client.commands.set(command.data.name, command);
}

const eventsFiles = fs
  .readdirSync(path.join(__dirname, "./events"))
  .filter((file) => file.endsWith(".js"));

for (const file of eventsFiles) {
  const event = require(`./events/${file}`);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, commands));
  } else {
    client.on(event.name, (...args) => event.execute(...args, commands));
  }
}
// on Bot add, create a channel named "bounties"
client.on("guildCreate", (guild) => {
  guild.channels
    .create("bounties", { reason: "maintains your bounty" })
    .then(() => console.log("created a channel"))
    .catch((e) => console.log(e));
});

// const guildId = "785428302114455592"; //785428302114455592

// client.on("messageCreate", () => {
//   const guildId = "785428302114455592"; //785428302114455592
//   const guild = client.guilds.cache.get(guildId);
//   let commands; // holds the guild command manager

//   // let k = guild.roles.cache.role
//   // console.log(k);

//   if (guild) {
//     commands = guild.commands;
//   } else {
//     commands = client.application?.commands;
//   }
// });

/*Types of Slash command
  Guild based
  Global
*/

// 785428302114455592 // this is the server id
// EnYqiB4AsV9dcihwCdcPrnE6fXZLNxYxfrzVG4CT2vR8

// enable ony whitelisted cors
const cors = require("cors");

// const origin = [`${process.env.WEBSITE_BASE_URL}`, "http://localhost:8080"];
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use("/bounties", bountyRoutes);

// run server in 3000
app.listen(process.env.PORT || 3000, () => {
  console.log("express server running on localhost:3000");
});

client.login(process.env.TOKEN);

// const findResult = await orders.find({
//   name: "Lemony Snicket",
//   date: {
//     $gte: new Date(new Date().setHours(00, 00, 00)),
//     $lt: new Date(new Date().setHours(23, 59, 59)),
//   },
// });
