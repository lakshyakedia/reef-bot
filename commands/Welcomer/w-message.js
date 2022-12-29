
const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");
const db = require(process.cwd()+'/schema/welcomer.js')
module.exports = {
    name: "w-message",
    description: "Set up welcomer Message.",
  category:'welcome',
  cooldown: 5,
  userPerms: ["Administrator"],
   
    run: async (client, message, args, prefix) => {
        
     
    
    let nocha = new EmbedBuilder()
.setDescription(`${client.emoji.wrong} Argument must be \`reset\` or the new welcomer embed's description.`)
.setFooter({text: `Tip: Type  ${prefix}welcome-message reset`})
.setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)

    if(!args.join(" "))
return message.reply({embeds:[nocha]});
 
        
        
let data = await db.findOne({'guild': message.guild.id})

if(!data) {
  const em = new EmbedBuilder()
  .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
  .setDescription(`${client.emoji.wrong} First Setup Welcomer using ${prefix}w-setup.`)
return message.reply({embeds: [em]})
}

 if(data) {
 await db.updateOne({
guild: message.guild.id},{
message: args.join(' ')
})

}
 


const xddn = new EmbedBuilder()
.setTitle(`${client.emoji.right} Welcomer Embed Description Set:`)
.setDescription(`${args.join(' ')}`)
.setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)

message.reply({embeds:[xddn]})
}}