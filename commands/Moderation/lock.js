const {  EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "lock",
    cooldown: 5,
    description: "Lock a channel.",
  category:'mod',
  userPerms: ["ManageChannels"],
   

    run: async (client, message, args, prefix) => {
var botperm = message.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageRoles) || message.guild.members.me.permissions.has(PermissionsBitField.Flags.Administrator)

            var uperm = message.member.permissions.has(PermissionsBitField.Flags.ManageChannels) || message.member.permissions.has(PermissionsBitField.Flags.Administrator)
let upn = new EmbedBuilder()
   
    .setDescription(`You don\'t have permission to use this command.`)
.setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
let bpn = new EmbedBuilder()
   
    .setDescription(`I don\'t have permission to run this command.`)
.setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)

      if(!uperm)
return message.reply({embeds:[upn]});
      if(!botperm)
return message.reply({embeds:[bpn]});
      
      

    const reason = args.slice(1).join(' ') || 'Not provided';

const channel = message.mentions.channels.first() || message.channel;
        
let nocha = new EmbedBuilder()
.setDescription(`That\'s not a text/voice-text channel.`)
.setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)

      if(!channel.isTextBased())
return message.reply({embeds:[nocha]});

        
 

  

    
await channel.permissionOverwrites.edit(message.guild.roles.everyone, {
  SendMessages: false
},{reason: reason + ' | '+ message.user.tag + ' '+message.user.id})



      const locked = new EmbedBuilder()
     .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
.setDescription(`<#${channel.id}> has been locked.`)

     
    message.reply({
        embeds: [locked]
      })
  
      
    }}
