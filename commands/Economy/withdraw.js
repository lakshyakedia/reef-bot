const {
  EmbedBuilder,
  PermissionsBitField,
  ApplicationCommandOptionType,
  MessageEmbed,
} = require("discord.js");

const User = require("../../Models/User.js");

module.exports = {
  name: "withdraw",

  description: "Withdraw The balance of an user",

  category: "economy",

  aliases: ["with"],

  cooldown: 0,

  run: async (client, message, args, prefix) => {
    const user = message.author;
    const amount = parseInt(args[0]);

    const result =
      (await User.findOne({ userId: user.id })) ||
      new User({ userId: user.id });
    // run: async (interaction) => {

    const give = new EmbedBuilder()

      .setColor(
        message.guild.members.me.displayHexColor !== "#000000"
          ? message.guild.members.me.displayHexColor
          : client.config.embedColor
      )

      .setDescription(`<:11:1052589045374533653> Enter A Valid Amount`);

    if (!amount) return message.reply({ embeds: [give] });

    const crs = new EmbedBuilder()

      .setColor(
        message.guild.members.me.displayHexColor !== "#000000"
          ? message.guild.members.me.displayHexColor
          : client.config.embedColor
      )

      .setDescription(`💰 You need some money to withdraw `);

    if (result.bank < amount) return message.reply({ embeds: [crs] });

    // embed = new MessageEmbed({ color: "YELLOW" })

    const success = new EmbedBuilder()

      .setColor(
        message.guild.members.me.displayHexColor !== "#000000"
          ? message.guild.members.me.displayHexColor
          : client.config.embedColor
      )

      .setDescription(
        `✅ You have withdrawn\` ${amount} 🪙 \` amount into your wallet`
      );

    result.wallet += amount;

    result.bank -= amount;

    result.save();

    return message.reply({ embeds: [success] });
  },
};
