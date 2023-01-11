const { EmbedBuilder } = require("discord.js");
const moment = require("moment")
const {wrong, right} = require('../../util/emoji.json');
const verificationLevels = {
  0: "None",
  1: "Low",
  2: "Medium",
  3: "High",
  4: "Very High"
}
const booster = {
  0: 'Level 0',
  1: 'Level: 1',
  2: 'Level: 2',
  3: 'Level: 3'
}
const disabled = wrong;
const enabled = right;

module.exports = {
    name: "serverinfo",
    category: "info",
    aliases: ['si'],
    description: "To Get Information About The Server",
    usage: "",
    run: async (client, message, args) => {
      this.client = client;
      const guild = message.guild;
      const { createdTimestamp, ownerId , description} = guild;
      function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
              return days + (days == 1 ? " day" : " days") + " ago";
      };
      const roles = guild.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(role => role.toString())
        .slice(0, -1)
      let rolesdisplay;
      let roless;
      if (roles.length < 15) {
        rolesdisplay = roles.join(' ')
        if (roles.length < 1) rolesdisplay = "None"
      } else {
        
        rolesdisplay = `\`Too many roles to show.\``
      }
      if(rolesdisplay.length > 1024)
        rolesdisplay = `${roles.slice(4).join(" ")} \`more..\``
        await message.guild.members.fetch();
      const members = guild.members.cache
      const channels = guild.channels.cache
      const emojis = guild.emojis.cache
      let data = guild.bannerURL()
      if(data){
        
        return message.reply({embeds: [new EmbedBuilder()
            .setColor(client.config.embedColor)
          .setTitle(`${guild.name}'s Information`)
          .setThumbnail(guild.iconURL({ dynamic: true }))
          .setImage(guild.bannerURL({size: 4096}))
          .addFields([
            {
              name: '__About__',
              value: `**Name**: ${guild.name} \n **ID**: ${guild.id} \n **Owner <:zzown:1058386870469402665>:** <@!${guild.ownerId}> (${guild.ownerId})\n**Created at:** <t:${parseInt(createdTimestamp / 1000)}:R>\n**Members: **${guild.memberCount}`
            },
            {
              name: '__Server Information__',
              value: `**Verification Level:** ${verificationLevels[guild.verificationLevel]}\n**Inactive Channel: **${guild.afkChannelId ? `<#${guild.afkChannelId}>` : `${disabled}`}\n**Inactive Timeout: **${guild.afkTimeout/60} mins\n**System Messages Channel: **${guild.systemChannelId ? `<#${guild.systemChannelId}>` : disabled}\n**Boost Bar Enabled: **${guild.premiumProgressBarEnabled ? enabled : disabled}`
            },
            {
              name: '__Channels__',
              value: `**Total: ** ${channels.size}\n**Channels: **<:DGH_text:1058381062335639572> ${channels.filter(channel => channel.type === 0).size} | <:zz_voice:1062746660393992206> ${channels.filter(channel => channel.type === 2).size} | <:forumch:1058382002690211872> ${channels.filter(channel => channel.type === 15).size}`
            },
            {
              name: '__Members__',
              value: `**Total: ** ${guild.memberCount}\n**Humans: **<:human:1058992781604954152> ${members.filter(member => !member.user.bot).size} | <:bots:1058993082416250910>  ${members.filter(member => member.user.bot).size} `
            },
            {
              name: '__Emoji Info__',
              value: `**Regular:** ${emojis.filter(emoji => !emoji.animated).size} \n**Animated:** ${emojis.filter(emoji => emoji.animated).size} \n**Total:** ${emojis.size}`
            },
            {
              name: '__Boost Status__',
              value: `${booster[guild.premiumTier]} [<a:booster:1058377741612892160> ${guild.premiumSubscriptionCount || '0'} Boosts]`
            },
            {
              name: `__Server Roles__ [${roles.length}]`,
              value: `Highest Role: <@&${message.guild.roles.highest.id}>\n${rolesdisplay}`
            }
          ])
          .setTimestamp()
        ]})
      }
  }
};