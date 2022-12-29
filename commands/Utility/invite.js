const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");

module.exports = {
    name: "invite",
    category: 'utility',
    aliases: [ "addme", "Links", "inv"],
    description: "Shows my invite Links!",
    args: false,
    usage: "",
    cooldown:5,
    
    botPerms: ['ViewChannel','EmbedLinks','UseExternalEmojis'],
userPerms: ['ViewChannel'],
    owner: false,
   run: async (client, message, args) => {
         
         
    const row = new ActionRowBuilder()
			.addComponents(
                
            new ButtonBuilder()
    .setLabel("Invite")
    .setStyle("Link")
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`) ,
       
       
  );

          
           message.channel.send({components: [row]})
    }
}