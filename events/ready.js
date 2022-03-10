

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
require("dotenv").config();


module.exports = {
    name: "ready",
    once: true,
    execute (client, commands) {
        console.log("Bounty bot is online! 🚀");
        client.user.setActivity("Bounties /💲", { type: "WATCHING" });
        const CLIENT_ID = client.user.id;
        const rest = new REST({
          version: "10",
        }).setToken(process.env.TOKEN);
      
        (async () => {
          try {
            if (process.env.ENV === "production") {
              await rest.put(Routes.applicationCommands(CLIENT_ID), {
                // when shipping for production remove the GUILD_ID, add CLIENT_ID
                body: commands,
              });
              console.log("Scuccessfully updated commands globally.");
            } else {
              await rest.put(
                Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID),
                {
                  // when shipping for production remove the GUILD_ID, add CLIENT_ID
                  body: commands,
                }
              );
              console.log("Scuccessfully updated commands locally.");
            }
          } catch (err) {
            if (err) {
              console.log(err);
            }
          }
        })();
    }
}