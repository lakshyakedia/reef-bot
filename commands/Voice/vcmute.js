const { Message, Client, EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, SelectMenuBuilder } = require("discord.js");

module.exports = {
  name: "vcmute",
  description:'Mutes a User in VC',
   cooldown: 5,
    category : "vmod",
  run: async (client, message, args) => {
    if (!message.member.permissions.has(PermissionsBitField.resolve('MuteMembers'))){
      const error = new EmbedBuilder()
        .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
        .setDescription(`${client.emoji.wrong} | You must have \`Mute members\` permission to use this command.`)
      return message.reply({embeds: [error]});
    }
    if (!message.guild.members.me.permissions.has(PermissionsBitField.resolve('MuteMembers'))){
      const error = new EmbedBuilder()
        .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
        .setDescription(`${client.emoji.wrong} | I must have \`Mute members\` permission to use this command.`)
      return message.reply({embeds: [error]});
    }
    if(!message.member.voice.channel){
      return message.reply({embeds: [new EmbedBuilder().setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor).setDescription(`${client.emoji.wrong} | You must be connected to a voice channel first.`)]})
    }
    if(!message.mentions.members.first()){
      return message.reply({embeds: [new EmbedBuilder().setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor).setDescription(`${client.emoji.wrong} | You must mention someone whom you want to mute in your vc.`)]})
    }
    let member = message.mentions.members.first();
    if(!member.voice.channel){
      return message.reply({embeds: [new EmbedBuilder().setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor).setDescription(`${client.emoji.wrong} | <@${member.user.id}> is not in your vc.`)]})
    }
    try{
      member.voice.setMute(true, `${message.author.tag} (${message.author.id})`)
      message.reply({embeds: [new EmbedBuilder().setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor).setDescription(`${client.emoji.right} | Successfully Muted <@${member.user.id}> From Voice!`)]})
    }catch(err){
      return message.reply({embeds: [new EmbedBuilder().setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor).setDescription(`${client.emoji.wrong} | I was unable to voice mute <@${member.user.id}>.`)]})
    }
  }
}