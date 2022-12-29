
const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");
const db = require(process.cwd()+'/schema/welcomer.js')
module.exports = {
    name: "w-settings",
    cooldown: 5,
    description: "Welcomer settings.",
  category:'welcome',
 

    run: async (client, message, args, prefix) => {
        
    
   
let data = await db.findOne({'guild': message.guild.id})

        
 let hahaXd = null;
let channel = null;
let mes = null;
if(!data) {
   hahaXd = 'Disabled';
   channel = '_[ Not Available ]_';
   mes = '_[ Not Available ]_';
}
   if(data){
      hahaXd = data.enabled.replaceAll('true','Enabled').replaceAll('false','Disabled')
       mes = data.message;
    channel = `<#${data.channel}>`
   }

const xddn = new EmbedBuilder()
.setTitle('Welcomer Settings')
.setDescription(`**Welcomer:**\n\`${hahaXd}\`\n\n**Channel:**\n${channel}\n\n Embed Description:\`${mes}\``)
.setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
.setTimestamp()
.setThumbnail(client.user.displayAvatarURL())
message.reply({embeds:[xddn]})
}}