const {  EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "unban",
    cooldown: 5,
    description: "unban a user",
  category:'mod',
  userPerms: ["BanMembers"],
   

    run: async (client, message, args, prefix) => {
var botperm = message.guild.members.me.permissions.has(PermissionsBitField.Flags.BanMembers) || message.guild.members.me.permissions.has(PermissionsBitField.Flags.Administrator)

            var uperm = message.member.permissions.has(PermissionsBitField.Flags.BanMembers) || message.member.permissions.has(PermissionsBitField.Flags.Administrator)
let upn = new EmbedBuilder()
   
    .setDescription(`<:11:1052589045374533653> You don\'t have permission to use this command.`)
.setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
let bpn = new EmbedBuilder()
   
    .setDescription(`<:11:1052589045374533653> I don\'t have permission to run this command.`)
.setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)

      if(!uperm)
return message.reply({embeds:[upn]});
      if(!botperm)
return message.reply({embeds:[bpn]});
      
      

    const reason = args.slice(1).join(" ") || 'Not provided';
const userid = args[0];
const user = await client.users.fetch(userid).catch(() => null);
        
let nouser = new EmbedBuilder()
.setDescription(`<:11:1052589045374533653> No user found with that id.`)
.setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)

      if(!user)
return message.reply({embeds:[nouser]});

        
message.guild.bans.remove(user, reason + ' | '+ message.user.tag + ' '+message.user.id)

  .catch(console.error);

  
    




      const unbanned = new EmbedBuilder()
     .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
.setDescription(`<:10:1052589041717092412> \`${user.tag}\` has been unbanned.`)

     
    message.reply({
        embeds: [unbanned]
      })
  
      
    }}
