
const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
module.exports = {
    name: "daily",
    description: "A way to earn money!",
  category:'economy',
    aliases:['daily'],
  cooldown: 5,

   
    run: async (client, message, args, prefix) => {
        
        const user = message.mentions.users.first() || message.author;
        let result = await cs.daily({
            user: user,
            guild: {id: null},
          amount:100
        });
       if(result.error){
             const ems = new EmbedBuilder()

        .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)

        

        .setDescription(`

        ${client.emoji.wrong} You\'ve Claimed Your Daily Money recently.

        Try Again in ${result.time}`)

      return message.reply({embeds: [ems]});
   }   else {
        const daily = new EmbedBuilder()

        .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)

        .setDescription(`

        You Earned ${client.emoji.coin}${result.amount}.

        You\'re now on ${result.rawData.streak.daily} days daily streak. `)

     
return message.reply({embeds: [daily]})
}
    }
  }