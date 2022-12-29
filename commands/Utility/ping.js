const { EmbedBuilder } = require('discord.js');

module.exports = {
    name : "ping",
    aliases: ['ping'],
    cooldown:5,
    category: 'utility',
    botPerms: ['ViewChannel','EmbedLinks','UseExternalEmojis'],
userPerms: ['ViewChannel'],
   usage: ['ping'],
description: "gives the latency of bot",
    run : async (client,message,args)=> {
        
         const ms = require('ms')
        const embed = new EmbedBuilder()
        .setAuthor({name: 'Ping',iconURL:client.user.displayAvatarURL()})
       .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
.setDescription(`\`Pinging\`\n\`Pinging\`\n\`Pinging\``)
        const g = await message.channel.send({embeds: [embed]})
        const da = await client.db.ping(ms)
        const pi = new EmbedBuilder()
        .setAuthor({name: 'Ping',iconURL:client.user.displayAvatarURL()})
.setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
.setDescription(`Gateway Ping : \`${client.ws.ping}ms\`\nREST Ping :  \`${g.createdTimestamp - message.createdTimestamp}ms\`\nDatabase Ping : \`${da}ms\``)
    g.edit({embeds: [pi]})  
    }
}