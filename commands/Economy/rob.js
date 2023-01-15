
const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
module.exports = {
    name: "rob",
    description: "A way to earn money!",
  category:'economy',
    aliases:['steal'],
  cooldown: 5,

   
    run: async (client, message, args, prefix) => {
        const user = message.mentions.users.first();

    let sender = message.author;


let result = await cs.rob({

            user: sender,

            user2: user,

            guild:{id: null},

            minAmount: 100,

            successPercentage: 5,

            cooldown: 25, //25 seconds,

            maxRob: 1000

        });


if (result.error) {

    if (result.type === "time"){

        const time = new EmbedBuilder()

        .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)

        .setDescription(`You have already robbed recently Try again in ${result.time}`)

      return message.reply({embeds: [time]})
        }
if (result.type === "low-money"){

        const low = new EmbedBuilder()

        .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)

        .setDescription(`You need atleast $${result.minAmount} to rob somebody.`)

      return message.reply({embeds: [low]})
    }
if (result.type === "low-wallet"){

        const you = new EmbedBuilder()

        .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)

        .setDescription(`${result.user2.username} have less than $${result.minAmount} to rob.`)

      return message.reply({embeds: [you]})
        }
      if (result.type === "caught"){

        const caught = new EmbedBuilder()

        .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)

        .setDescription(`you robbed ${result.user2.username} and got caught and you payed ${result.amount} to ${result.user2.username}!`)

      return message.reply({embeds: [caught]})
       }
  } else {

    if (result.type === "success")

      {    

        const lms = new EmbedBuilder()

        .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)

          .setDescription(`

you robbed ${result.user2.username} and got away with ${result.amount}!`)

      return message.reply({embeds: [lms]})
}
                                    }
    }
  }