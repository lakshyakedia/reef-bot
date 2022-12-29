const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js");


module.exports = {

name : "uptime",
description : "Gives You Last Restart of the bot date",
cooldown:5,  
  botPerms: ['ViewChannel','EmbedLinks','UseExternalEmojis'],
userPerms: ['ViewChannel','Connect','Speak'],
run : async (client,interaction) => {


        const duration1 = Math.round((Date.now() - interaction.client.uptime)/1000);

const embed = new EmbedBuilder()
.setColor(`${client.config.embedColor}`)      
.setDescription(`I am online from <t:${duration1}:R>`)

     interaction.reply({embeds: [embed]})
}



}