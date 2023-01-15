const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");

const CurrencySystem = require("currency-system");

const cs = new CurrencySystem;

module.exports = {

    name: "coinflip",

    description: "Flip some coins to earn money",

  category:'economy',

    aliases:['cf'],

  cooldown: 20,

   

    run: async (client, message, args, prefix) => {
let msg = await message.channel.send("Fliping the coin")


  let UChoice = args[0];

  if (Math.floor(Math.random() * 10) > 5) {

    // 50 -50 chance

    // lets say 6-10 is heads

    if (UChoice === "heads") {

      await msg.edit(`Horray You Won!`);

    } else {

      await msg.edit(`Uh, You Lost!`);

    }

  } else {

    // lets say 1-5 is tails

    if (UChoice === "tails") {

      await msg.edit(`Horray You Won!`);

    } else {

      await msg.edit(`Uh, You Lost!`);

    }

  }

}
    }

