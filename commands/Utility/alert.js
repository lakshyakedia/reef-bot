const { EmbedBuilder,  ButtonBuilder, ActionRowBuilder, Permissions } = require('discord.js')

    module.exports = {
    name: "alert",
    category: 'info',
    aliases: [ "alert" ],
    cooldown:5,
    description: "Shows the Important alerts announced by the developer",
    args: false,
    usage: "alert",
    
    
    botPerms: ['ViewChannel','EmbedLinks','UseExternalEmojis'],
userPerms: ['ViewChannel'],
   
    run: async (client, message, args) => {
         const embed = new EmbedBuilder()
        .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
        .setDescription("Select any one Category to continue with news")
        
       const Announcment = new ButtonBuilder().setCustomId("announcement").setLabel("Announcement").setStyle("Secondary");
        
        const Patch = new ButtonBuilder().setCustomId("patch").setLabel("Patch Notes").setStyle("Secondary");
        
          
        
        const row = new ActionRowBuilder().addComponents(Announcment, Patch);
        message.channel.send({embeds: [embed], components: [row]})
        }
        }
