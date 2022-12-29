const {EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "ban",
    description: "ban a member.",
  category:'mod',
  cooldown: 5,
 userPerms: ["BanMembers"],
    

    run: async (client, message, args, prefix)=> {
var botperm = message.guild.members.me.permissions.has(PermissionsBitField.Flags.BanMembers) || message.guild.members.me.permissions.has(PermissionsBitField.Flags.Administrator)

            var uperm = message.member.permissions.has(PermissionsBitField.Flags.BanMembers) || message.member.permissions.has(PermissionsBitField.Flags.Administrator)
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
      
      
 const member = message.mentions.members.first() ||  message.guild.members.cache.get(args[0]);
    const reason = args.slice(1).join(" ") || 'Not provided'

if(!member)
  return message.reply('Member not found.');
      
if (member.id === message.user.id)
    return message.reply({ content: `You Can\'t Ban yourself.`});

  let bruh1 = new EmbedBuilder()
   
    .setDescription(`${client.emojis.wrong}  You don\'t have permission to moderate that member.`)
.setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
      if (message.member.roles.highest.position <= member.roles.highest.position && message.user.id !== message.guild.ownerId)
        return message.reply({embeds:[bruh1]})
    

let bruh11 = new EmbedBuilder()
     
  .setDescription(`${client.emojis.wrong} I don\'t have permissions to moderate that member.`)
.setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
  if (!member.bannable) return message.reply({ embeds: [bruh11] });



      let banned = new EmbedBuilder()
     .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
.setDescription(`${client.emojis.right} \`${member.user.tag}\` has been banned.`)

        return (
    (    await member.ban({reason:reason + ' | '+ message.user.tag + ' '+message.user.id})) +
    message
      .reply({
        embeds: [banned]
      })
  );
      
    }}
