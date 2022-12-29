const { Message, Client, EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, SelectMenuBuilder } = require("discord.js");

module.exports = {
  name: "vckick",
 cooldown: 5,
    description:'Kicks a User in VC',
    category : "vmod",
  run: async (client, message, args) => {
    if (!message.member.permissions.has(PermissionsBitField.resolve('MoveMembers'))){
      const error = new EmbedBuilder()
        .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
        .setDescription(`${client.emoji.wrong} | You must have \`Move members\` permission to use this command.`)
      return message.reply({embeds: [error]});
    }
    if (!message.guild.members.me.permissions.has(PermissionsBitField.resolve('MoveMembers'))){
      const error = new EmbedBuilder()
        .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
        .setDescription(`${client.emoji.wrong} | I must have \`Move members\` permission to use this command.`)
      return message.reply({embeds: [error]});
    }
    if(!message.member.voice.channel){
      return message.reply({embeds: [new EmbedBuilder().setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor).setDescription(`${client.emoji.wrong} | You must be connected to a voice channel first.`)]})
    }
    if(!message.mentions.members.first()){
      return message.reply({embeds: [new EmbedBuilder().setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor).setDescription(`${client.emoji.wrong} | You must mention someone whom you want to kick from your vc.`)]})
    }
    let member = message.mentions.members.first();
    if(!member.voice.channel){
      return message.reply({embeds: [new EmbedBuilder().setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor).setDescription(`${client.emoji.wrong} | <@${member.user.id}> is not in your vc.`)]})
    }
    try{
      member.voice.disconnect();
      message.reply({embeds: [new EmbedBuilder().setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor).setDescription(`${client.emoji.right} | Successfully Kicked <@${member.user.id}> From Voice!`)]});
    }catch(err){
      return message.reply({embeds: [new EmbedBuilder().setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor).setDescription(`${client.emoji.wrong} | I was unable to voice kick <@${member.user.id}>.`)]});
    }
  }
}
