const { EmbedBuilder } = require("discord.js")
module.exports = {

name : "ping",
description : "cheking ping of bot",
cooldown:5,  
  botPerms: ['ViewChannel','EmbedLinks','UseExternalEmojis'],
userPerms: ['ViewChannel','Connect','Speak'],
run : async (client,interaction,args) => {

    const ms = require('ms')
    const embed = new EmbedBuilder()
    .setAuthor({name: 'Ping',iconURL:client.user.displayAvatarURL()})
   .setColor(interaction.guild.members.me.displayHexColor !== '#000000' ? interaction.guild.members.me.displayHexColor : client.config.embedColor)
.setDescription(`\`Pinging\`\n\`Pinging\`\n\`Pinging\``)
    const g = await interaction.reply({embeds: [embed]})
    const da = await client.db.ping(ms)
    const pi = new EmbedBuilder()
    .setAuthor({name: 'Ping',iconURL:client.user.displayAvatarURL()})
.setColor(interaction.guild.members.me.displayHexColor !== '#000000' ? interaction.guild.members.me.displayHexColor : client.config.embedColor)
.setDescription(`\`\`\`Gateway Ping : \`${client.ws.ping}ms\`\nREST Ping :  \`${Date.now() - interaction.createdTimestamp}ms\`\nDatabase Ping : \`${da}ms\`\`\`\``)
interaction.editReply({embeds: [pi]})  




}



}