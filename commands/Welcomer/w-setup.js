
const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");
const db = require(process.cwd()+'/schema/welcomer.js')
module.exports = {
    name: "w-setup",
    description: "Set up welcomer.",
  category:'welcome',
  cooldown: 5,
  userPerms: ["Administrator"],
   
    run: async (client, message, args, prefix) => {
        
    const channelA = message.mentions.channels.first();    
    
    let nocha = new EmbedBuilder()
.setDescription(`${client.emoji.wrong} That\'s not a text channel.`)
.setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)

    if(!channelA.isTextBased())
return message.reply({embeds:[nocha]});
 
        
        
let data = await db.findOne({'guild': message.guild.id})

if(!data) {
data = new db({
guild: message.guild.id,
enabled: true,
channel: channelA.id
}).save();
}

 if(data) {
 await db.updateOne({
guild: message.guild.id},{
enabled: true,
channel: channelA.id
})

}
 


const xddn = new EmbedBuilder ()
.setDescription(`${client.emoji.right} Welcomer is now enabled in: ` + `<#${channelA.id}>`)
.setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)

message.reply({embeds:[xddn]})
}}