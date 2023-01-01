
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
.setDescription(`<:11:1052589045374533653> That\'s not a text channel.`)
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
.setDescription(`<:10:1052589041717092412> Welcomer is now enabled in: ` + `<#${channelA.id}>`)
.setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)

message.reply({embeds:[xddn]})
}}