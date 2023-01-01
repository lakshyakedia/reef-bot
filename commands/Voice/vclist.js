const { Message, Client, EmbedBuilder, ActionRowBuilder, PermissionsBitField,ButtonBuilder, SelectMenuBuilder } = require("discord.js");

module.exports = {
  name: "vclist",
  description:'Gives a list of users in VC',
   cooldown: 5,
    category : "vmod",
  run: async (client, message, args) => {
    if(!message.member.voice.channel){
      return message.reply({embeds: [new EmbedBuilder().setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor).setDescription(`<:11:1052589045374533653> | You must be connected to a voice channel first.`)]})
    }
    let members = message.guild.members.cache.filter(m => m.voice?.channel?.id == message.member?.voice?.channel?.id).map(m => `${m.user.tag} | <@${m.user.id}>`).join(`\n`)
    return message.reply({embeds: [new EmbedBuilder().setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor).setDescription(members).setTitle(`**Users in ${message.member.voice.channel.name} - ${message.member.voice.channel.members.size}**`)]})
  }
}