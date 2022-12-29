const { Client, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")
const db = require(process.cwd() + '/schema/welcomer.js')
module.exports = {
  name: "guildMemberAdd",
  run: async (client, member) => {
    let guild = client.guilds.cache.get(member.guild.id);
    let data = await db.findOne({ 'guild': guild.id })


    if (!data)
      return;
    if (data.enabled == 'false')
      return;

    let channel = guild.channels.cache.get(data.channel)
    if (!channel)
      return;
    let content = data.message.replaceAll('`', "\`").replaceAll('\n', "\n").replaceAll('<<user.name>>', member.user.username).replaceAll('<<user.id>>', member.user.id).replaceAll('<<user.tag>>', member.user.tag).replaceAll('<<guild.mc>>', guild.memberCount + 1).replaceAll('<<guild.name>>', guild.name).replaceAll('<<user.mention>>', `<@${member.user.id}>`);

    const embed = new EmbedBuilder()
      .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL(), url: `https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=applications.commands%20bot` })
      .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
      .setDescription(`${content}`)
      .setTimestamp()
    channel.send({ embeds: [embed] })
  }
}




