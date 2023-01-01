const { CommandInteraction, Client, EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");
const db = require(process.cwd()+'/schema/anti-new-line.js')
module.exports = {
    name: "anti-new-line",
    description: "Automod anti new line toggle.",
  category:'automod',
  cooldown: 5,
  userPerms: ["ManageGuild"],
  

  run: async (client, message, args, prefix) => {
    let data = await db.findOne({'guild': message.guild.id})
        
    
      if(!data) {
      
        data = new db({
         guild: message.guild.id,
         enabled: 'false'
        }).save();
        
        }
        if(data.enabled  === 'false'){
         await db.updateOne({ guild: message.guild.id }, { enabled: 'true' });
         }  
         if(data.enabled  === 'true' ){
          await db.updateOne({ guild: message.guild.id }, { enabled: 'false' });
          }  
    
      
    
         
    const newData = await db.findOne({'guild': message.guild.id})
    
    const yeahU = new EmbedBuilder()
          .setTitle(`<:4_:1052589026294632448> **Anti-New-Line toggle :  ${newData.enabled}**`)
          .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
    message.reply({embeds:[yeahU]})
    
    
        }}