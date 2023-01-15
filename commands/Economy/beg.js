
const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
module.exports = {
    name: "beg",
    description: "A way to earn money!",
  category:'economy',
    aliases:['beg'],
  cooldown: 5,

   
    run: async (client, message, args, prefix) => {
        
        const user = message.author;
      
     let result = await cs.beg({
        user: user,
        guild: {id: null},
        minAmount: 20,
        maxAmount: 100,
        cooldown: 100 // 60 seconds

    });
        if(result.error){
             const ems = new EmbedBuilder()

        .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : '#2F3136')

        

        .setDescription(`

        You have begged recently Try again in ${result.time}`)

      return message.reply({embeds: [ems]});
   }   else {
        const beg = new EmbedBuilder()

        .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : '#2F3136')

        .setDescription(`

        You have earned $${result.amount}.`)
     
return message.reply({embeds: [beg]})
}
    }
  }