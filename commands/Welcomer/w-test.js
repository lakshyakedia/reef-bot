
const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");
const db = require(process.cwd()+'/schema/welcomer.js')
module.exports = {
    name: "w-test",
    description: "welcomer Message test.",
  category:'welcome',
  cooldown: 5,
  userPerms: ["Administrator"],
   
    run: async (client, message, args, prefix) => {
        
     
      let guild = client.guilds.cache.get(message.guild.id);
      let data = await db.findOne({ 'guild': guild.id })
  
let lolXd = new EmbedBuilder()
.setDescription(`${client.emoji.wrong} Welcomer is already disabled.`)
.setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)

if(!data) {
return message.reply({embeds:[lolXd]});
}
      if (data.enabled == 'false')
      return message.reply({embeds:[lolXd]});
      let channel = guild.channels.cache.get(data.channel)
      if (!channel)
        return;
      let content = data.message.replaceAll('`', "\`").replaceAll('\n', "\n").replaceAll('<<user.name>>', message.author.username).replaceAll('<<user.id>>', message.author.id).replaceAll('<<user.tag>>', message.author.tag).replaceAll('<<guild.mc>>', guild.memberCount + 1).replaceAll('<<guild.name>>', guild.name).replaceAll('<<user.mention>>', `<@${message.author.id}>`);
  
      const embed = new EmbedBuilder()
        .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL(), url: `https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=applications.commands%20bot` })
        .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
        .setDescription(`${content}`)
        .setTimestamp()
      channel.send({ embeds: [embed] })
}}