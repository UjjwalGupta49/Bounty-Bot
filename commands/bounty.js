const discord = require("discord.js");
const shortHash = require("short-hash");
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const BountySettings = require("../models/bountySettings");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bounty")
    .setDescription("Create a bounty")
    .addStringOption((option) =>
      option
      .setName("title")
      .setDescription("title of the bounty")
      .setRequired(true)
    )
    .addStringOption((option) =>
      option
      .setName("breif")
      .setDescription("One line description of the bounty")
      .setRequired(true)
    )
    .addStringOption((option) =>
      option
      .setName("description")
      .setDescription("The description of the bounty")
      .setRequired(true)
    )
    .addStringOption((option) =>
      option
      .setName("payment_method")
      .setDescription("USDC or SOL")
      .addChoice("USDC", "USDC")
      .addChoice("SOL", "SOL")
      .setRequired(true)
    )
    .addNumberOption((option) =>
      option
      .setName("reward")
      .setDescription("The amount to be paid")
      .setRequired(true)
    )
    .addStringOption((option) =>
      option
      .setName("attachment_link")
      .setDescription("Link to attachment")
      .setRequired(false)
    )
    .addStringOption((option) =>
      option
      .setName("acceptable_by")
      .setDescription("The user that can accept the bounty, @role or @user")
      .setRequired(false)
    ),
  async excute(interaction) {
    const dateTime = new Date().toLocaleString();
    const uniqueId = shortHash(
      `The bounty is to create a metaverse and then blow it up, you get paid for both!` +
        Date.now()
    );
    let attachment_link;
    let acceptable_by;

    if ((interaction.options.getString("attachment_link") === null)) {
      attachment_link = "   🏁   ";
      
    }
    else{
      attachment_link = interaction.options.getString("attachment_link");
    }

    if (interaction.options.getString("acceptable_by") === null) {
      acceptable_by = "@everyone";
    }
    else {
      acceptable_by = interaction.options.getString("acceptable_by");
    }

    const title = String(interaction.options.getString("title"));
    const breif = String(interaction.options.getString("breif"));
    const description = String(interaction.options.getString("description"));
    const payment_method = String(interaction.options.getString("payment_method"));
    const reward = interaction.options.getNumber("reward");
    const user = interaction.member;

    const embed = new MessageEmbed()
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
        {
          name:"Acceptable by",
          value: acceptable_by,
        },
        { name: "Reward", value: `${reward} ${payment_method}`, inline: true },
        { name: "Attachment", value: attachment_link, inline: true },
      )
      .setFooter({ text: `${uniqueId}` });
    interaction.applicationId = uniqueId;

    const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
      .setCustomId('cancel')
      .setLabel('Cancel')
      .setStyle('SECONDARY'),
      new MessageButton()
      .setLabel('Finalize')
      .setStyle('LINK')
      .setURL(`${process.env.WEBSITE_BASE_URL}/bounty/?id=${uniqueId}`),
      // .setCustomId('finalize') only LINK buttons can have seturl method, cannot have customId.
    );

    const dmEmbed  = new MessageEmbed()
    .setColor("GREEN")
    .setTitle(`**Bounty Created**`)
    .setDescription(`${user} created a bounty for ${title} and reward: ${reward} ${payment_method}\n The bounty Id is ${uniqueId}, it's a unique identifier for this bounty\nPlease finalize your bounty and let's get started! ✅`)
    .setFooter({ text: `Bounty Bot/💲` });


    // await interaction.channel.send({ embeds: [embed] });
    await interaction.member.createDM().then((dm) => { // DM should go  as embed
      dm.send({ embeds: [dmEmbed] });
    });

    const bounty = new BountySettings({
      bountyId: uniqueId,
      bountyTitle: title,
      bountyAmount: reward,
      bountyPaymentMethod: payment_method,
      bountyStatus: "Pending", // Pending // Bounties will only be shown by bounty_list id status is active
      bountyAcceptableBy: acceptable_by,
      bountyAuthor: String(`<@${interaction.member.id}>`),
      bountyServerId: interaction.guild.id,
      bountyServerName: interaction.guild.name,
      bountyTimestamp: dateTime,
    });

    bounty.save(err => {
      if (err) {
        console.log(err);
        interaction.reply("Error saving bounty");
      }
      interaction.reply({ content: `${interaction.member} DM sent to you!`, embeds: [embed], components: [row], ephemeral: true   });  //  ephemeral: true,
    });

    // interaction.reply({ content: `${interaction.member} DM sent to you!`, embeds: [embed], components: [row], ephemeral: true, }); // ephemeral: true,
    //     console.log(interaction.guild.roles.cache.forEach(role => console.log(role.name)));
  },
};


// add date of completion
// retrive timestamp from the bounty 1) in users locale time, 2) in GMT standard time
