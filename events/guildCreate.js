const { EmbedBuilder, WebhookClient } = require('discord.js');
const { Webhooks: {server_remove}} = require('../config.json');
const moment = require('moment');

module.exports.run = async (client, guild) => {
  

  
  var emoji = "";
  let own = await guild.fetchOwner()
  
  let mcount = 0; 
client.guilds.cache.forEach((guild) => {
    mcount += guild.memberCount
})
let links = `https://cdn.discordapp.com/banners/`+guild.id+`/`+guild.banner+`.`+`webp?size=1024`;
 if(guild.partnered && guild.verified)
 emoji = `<:partnered:918906133563998230><:verified3:918906111359340594>`;
 else if(guild.partnered && !guild.verified)
 emoji = "<:partnered:918906133563998230>";
 else if(!guild.partnered && guild.verified)
 emoji = "<:verified3:918906111359340594>";
 else if(!guild.partnered && !guild.verified)
 emoji = "<:cross1:853965073383292970>";
  const embed = new EmbedBuilder()
    .setDescription(`Id: **${guild.id}**\nName: **${guild.name}**\nDiscord Level: ${emoji}\nMemberCount: \`${guild.memberCount + 1}\`\nCreated At: <t:${Math.round(guild.createdTimestamp/1000)}> (<t:${Math.round(guild.createdTimestamp/1000)}:R>)\nJoined At: <t:${Math.round(guild.joinedTimestamp/1000)}> (<t:${Math.round(guild.joinedTimestamp/1000)}:R>)`)
    .addFields({name:`**Owner**`,value: `Info: **${guild.members.cache.get(own.id) ? guild.members.cache.get(own.id).user.tag : "Unknown user"} (${own.id})**\nMentions: <@${own.id}>\nCreated At: <t:${Math.round(own.user.createdTimestamp/1000)}> (<t:${Math.round(own.user.createdTimestamp/1000)}:R>)`},
    {name:`**${client.user.username}'s Total Servers**`,value: `\`\`\`js\n${client.guilds.cache.size}\`\`\``,inline: true},
    {name:`**${client.user.username}'s Total Users**`,value: `\`\`\`js\n${mcount}\`\`\``,inline: true})
    
    .setTitle(guild.name)
    .setThumbnail(guild.iconURL({ dynamic: true, size: 1024})) 
    .setColor(client.config.embedColor)
    if(guild.vanityURLCode)
    {
      let temp = `https://discord.gg/`+guild.vanityURLCode;
    embed.setURL(temp)
    }
    if(guild.banner)
    embed.setImage(links)
    const web2 = new WebhookClient({ url: server_remove });
    web2.send({content: "**Server Joined**", embeds: [embed]})
}

