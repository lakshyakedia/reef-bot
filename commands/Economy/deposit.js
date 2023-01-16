const {
  EmbedBuilder,
  PermissionsBitField,
  ApplicationCommandOptionType,
  MessageEmbed,
} = require("discord.js");

const User = require("../../Models/User.js");

module.exports = {
  name: "deposit",

  description: "Deposit The balance of an user",

  category: "economy",

  aliases: ["dep"],

  cooldown: 2,

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

      .setDescription(
        `💰 You need \` ${
          amount - result.wallet
        } 🪙 \` more in your wallet to deposit money`
      );

    if (result.wallet < amount) return message.reply({ embeds: [crs] });

    // embed = new MessageEmbed({ color: "YELLOW" })

    const success = new EmbedBuilder()

      .setColor(
        message.guild.members.me.displayHexColor !== "#000000"
          ? message.guild.members.me.displayHexColor
          : client.config.embedColor
      )

      .setDescription(
        `✅ You have deposited \` ${amount} 🪙 \` amount into your bank account`
      );

    result.wallet -= amount;

    result.bank += amount;

    result.save();

    return message.reply({ embeds: [success] });
  },
};
