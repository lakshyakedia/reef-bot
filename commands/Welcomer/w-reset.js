
const { Commandmessage, Client, EmbedBuilder, PermissionsBitField, ApplicationCommandOpt, messageLinkionType } = require("discord.js");
const db = require(process.cwd()+'/schema/welcomer.js')
module.exports = {
    name: "w-reset",
    description: "Reset welcomer.",
  category:'welcome',
  cooldown: 5,
  userPerms: ["Administrator"],
   


    run: async (client, message, args, prefix) => {
        
    
    

 
        
        
let data = await db.findOne({'guild': message.guild.id})

let lolXd = new EmbedBuilder()
.setDescription(`${client.emoji.wrong} Welcomer is already disabled.`)
.setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)

if(!data) {
return message.reply({embeds:[lolXd]});
}

 await db.updateOne({ guild: message.guild.id }, { enabled: false});;
 


const xddn = new EmbedBuilder()
.setDescription(`${client.emoji.wrong} Welcomer data is now cleared.`)
.setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)

message.reply({embeds:[xddn]})
}}