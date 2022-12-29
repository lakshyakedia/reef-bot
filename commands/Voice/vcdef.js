const { Message, Client, PermissionsBitField,EmbedBuilder, ActionRowBuilder, ButtonBuilder, SelectMenuBuilder } = require("discord.js");

module.exports = {
  name: "vcdeafen",
  aliases: ['vcdeaf'],
    description:'Deafens a User in VC',
  cooldown: 5,
    category : "vmod",
  run: async (client, message, args) => {
    if (!message.member.permissions.has(PermissionsBitField.resolve('DeafenMembers'))){
      const error = new EmbedBuilder()
        .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
        .setDescription(`${client.emoji.wrong} | You must have \`Deafen members\` permission to use this command.`)
      return message.reply({embeds: [error]});
    }
    if (!message.guild.members.me.permissions.has(PermissionsBitField.resolve('DeafenMembers'))){
      const error = new EmbedBuilder()
        .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
        .setDescription(`${client.emoji.wrong} | I must have \`Deafen members\` permission to use this command.`)
      return message.reply({embeds: [error]});
    }
    if(!message.member.voice.channel){
      return message.reply({embeds: [new EmbedBuilder().setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor).setDescription(`${client.emoji.wrong} | You must be connected to a voice channel first.`)]})
    }
    if(!message.mentions.members.first()){
      return message.reply({embeds: [new EmbedBuilder().setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor).setDescription(`${client.emoji.wrong} | You must mention someone whom you want to deafen in your vc.`)]})
    }
    let member = message.mentions.members.first();
    if(!member.voice.channel){
      return message.reply({embeds: [new EmbedBuilder().setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor).setDescription(`<@${member.user.id}> is not in your vc.`)]})
    }
    try{
      member.voice.setDeaf(true, `${message.author.tag} (${message.author.id})`)
      message.reply({embeds: [new EmbedBuilder().setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor).setDescription(`${client.emoji.right} | Successfully deafened <@${member.user.id}> From Voice!`)]})
    }catch(err){
      return message.reply({embeds: [new EmbedBuilder().setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor).setDescription(`I was unable to voice deafen <@${member.user.id}>.`)]})
    }
  }
}