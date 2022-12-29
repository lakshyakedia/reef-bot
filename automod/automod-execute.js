const { 
PermissionsBitField,
EmbedBuilder
      } = require('discord.js');

const antilinkdb = require(process.cwd()+'/schema/anti-link.js')
const mentiondb = require(process.cwd()+'/schema/mass-mention.js')
const linedb = require(process.cwd()+'/schema/anti-new-line.js')

module.exports = {


    run: async (client, message) => {

if(!message.guild)
  return;

    const antilink = await antilinkdb.findOne({'guild': message.guild.id})
    
const mention = await mentiondb.findOne({'guild': message.guild.id})

    const newline = await linedb.findOne({'guild': message.guild.id})
    

    
   if(!message.member)
       return;
    
      var botperm = message.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageMessages) || message.guild.members.me.permissions.has(PermissionsBitField.Flags.Administrator)

            var uperm = message.member.permissions.has(PermissionsBitField.Flags.ManageMessages) || message.member.permissions.has(PermissionsBitField.Flags.Administrator)
     
      if(!botperm) 
 return;
      
if (!message.member.moderatable)
     return; 
if(uperm)
return;



if(isLink(message.content)) {
  if(!antilink)
    return;
if(antilink.enabled=='false')
      return;

  message.member.timeout(2 * 60 * 1000, 'Automod: Sending links')

let muuted = new EmbedBuilder() 
     .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
     .setDescription(`\`${message.author.tag}\` has been timeouted.\n**Reason:**\n\`Sending links.\`\n**Duration:**\n\`2 minutes\``)
   message.channel.send({embeds:[muuted]})


message.delete()
let lolemd = new EmbedBuilder()
   .setTitle("Automod Sending Link")
  .setDescription(`You have been timeouted for 2 minutes.`)
.setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)

.addFields({name:'Guild', value:`${message.guild.name} (\` ${message.guild.id} \`)`},
        {name:'Channel', value:`<#${message.channel.id}> (\` ${message.channel.id} \`)`}, 
        {name:'Message', value: `${message.content.toString()}`})
      
message.member.send({embeds:[lolemd]})
}

const linecount = message.content.split("\n").length;
    if (linecount > 8) {
      
if(!newline){
return;
}
    if(newline.enabled=='false'){
      return;
    }

message.member.timeout(2 * 60 * 1000, 'Automod: New lines')

let muuted = new EmbedBuilder() 
     .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
     .setDescription(`\`${message.author.tag}\` has been timeouted.\n**Reason:**\n\`New lines.\`\n**Duration:**\n\`2 minutes\``)
   message.channel.send({embeds:[muuted]})


message.delete()
let lolemd = new EmbedBuilder()
   .setTitle("Automod New Lines")
  .setDescription(`You have been timeouted for 2 minutes.`)
.setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)

.addFields({name:'Guild', value:`${message.guild.name} (\` ${message.guild.id} \`)`},
        {name:'Channel', value:`<#${message.channel.id}> (\` ${message.channel.id} \`)`}, 
        {name:'Message', value: `**_[ Not Available ]_**  \`( ${linecount} Lines )\``})
      
message.member.send({embeds:[lolemd]})

      
    }
      
 if (message.mentions.members.size > 5) {
  if(!mention){
return;
}
    if(mention.enabled=='false'){
      return;
    }
  message.member.timeout(2 * 60 * 1000, 'Automod: Mass mentioning')

let muuted = new EmbedBuilder() 
     .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
     .setDescription(`\`${message.author.tag}\` has been timeouted.\n**Reason:**\n\`Mass mentioning.\`\n**Duration:**\n\`2 minutes\``)
   message.channel.send({embeds:[muuted]})


message.delete()

     let lolemd = new EmbedBuilder()
   .setTitle("Automod Mass Mentioning")
  .setDescription(`You have been timeouted for 2 minutes.`)
.setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)

.addFields({name:'Guild', value:`${message.guild.name} (\` ${message.guild.id} \`)`},
        {name:'Channel', value:`<#${message.channel.id}> (\` ${message.channel.id} \`)`}, 
        {name:'Message', value: `${message.content.toString()}`})
      
message.member.send({embeds:[lolemd]})
      
  }





      

    
    }}

function isLink(string) {

        var res = string.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g)

   return (res !== null)

      }