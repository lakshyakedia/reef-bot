const { EmbedBuilder } = require("discord.js");
const moment = require("moment")


module.exports = {
    name: "serveravatar",
    category: "info",
    aliases: ['slogo','savtar'],
    description: "To Get Avatar Of The Server",
    usage: "",
    run: async (client, message, args) => {
     
      const guild = message.guild;
     
      
      let data = guild.iconURL()
      if(data){
        return message.reply({embeds: [new EmbedBuilder()
            .setColor(client.config.embedColor)
          .setTitle(`${guild.name}'s Avatar`)
          .setImage(guild.iconURL({dynamic: true}))          
          .setTimestamp()
        ]})
      }else
      {
        return message.reply({embeds: [new EmbedBuilder()
          .setColor(client.config.embedColor)
        .setTitle(`${guild.name}'s Avatar`)
        .setDescription(`<:11:1052589045374533653> No Avatar For This Guild`)        
        .setTimestamp()
      ]})
      }
  }
};