const { EmbedBuilder } = require("discord.js");
const moment = require("moment")


module.exports = {
    name: "serverbanner",
    category: "info",
    aliases: ['sbanner'],
    description: "To Get Banner of The Server",
    usage: "",
    run: async (client, message, args) => {
     
      const guild = message.guild;
     
      
      let data = guild.bannerURL()
      if(data){
        return message.reply({embeds: [new EmbedBuilder()
            .setColor(client.config.embedColor)
          .setTitle(`${guild.name}'s Banner`)
          .setDescription(`[\`PNG\`](${guild.bannerURL({format: 'png'})}) | [\`WEBP\`](${guild.bannerURL({format: 'webp'})}) | [\`JPEG\`](${guild.bannerURL({format: 'jpeg'})})`)
          .setImage(guild.bannerURL())          
          .setTimestamp()
        ]})
      }
      if(!data)
      {
        return message.reply({embeds: [new EmbedBuilder()
          .setColor(client.config.embedColor)
        .setTitle(`${guild.name}'s Banner`)
        .setDescription(`${client.emoji.wrong} No Banner For This Guild`)        
        .setTimestamp()
      ]})
      }
  }
};