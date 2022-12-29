const { Commandmessage, Client, EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "nick-reset",
    description: "Reset nickname of a member.",
  category:'mod',
  cooldown: 5,
  userPerms: ["ManageNicknames"],
   

    run: async (client, message, args, prefix) => {
var botperm = message.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageNicknames) || message.guild.members.me.permissions.has(PermissionsBitField.Flags.Administrator)

            var uperm = message.member.permissions.has(PermissionsBitField.Flags.ManageNicknames) || message.member.permissions.has(PermissionsBitField.Flags.Administrator)
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
      
      
 const member = message.mentions.users.first()
    const reason = args.slice(1).join(" ") || 'Not provided'

  let nouser = new EmbedBuilder()
.setDescription(`Member not found in guild.`)
.setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
  

if(!member)
  return message.reply({embeds:[nouser]});
      
if (member.id === message.author.id)
    return message.reply({  content: `Imagine resetting your own nickname!`});

  let bruh1 = new EmbedBuilder()
   
    .setDescription(`You don\'t have permission to moderate that member.`)
.setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
      if (message.member.roles.highest.position <= member.roles.highest.position && message.author.id !== message.guild.ownerId)
        return message.reply({embeds:[bruh1]})
    

let bruh11 = new EmbedBuilder()
     
  .setDescription(`I don\'t have permissions to moderate that member.`)
.setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
  if (message.guild.members.me.roles.highest.position <= member.roles.highest.position)
     return message.reply({ embeds: [bruh11] });



      let nicked = new EmbedBuilder()
     .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
.setDescription(`\`${member.user.tag}\'s\` nickname has been reset.`)

        return (
    (    await member.setNickname(null, reason + ' | '+ message.author.tag + ' '+message.author.id)) +
    message
      .reply({
        embeds: [nicked]
      })
  );
      
    }}
