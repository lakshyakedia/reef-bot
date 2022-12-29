const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const { readdirSync } = require("fs");
module.exports = {
  name: "help",
aliases: ['h'],
cooldown:5,
category: 'utility',

    botPerms: ['ViewChannel','EmbedLinks','UseExternalEmojis'],
userPerms: ['ViewChannel'],
   usage: ['h','help'],
description: "Gives My All command info",
  run: async (client, message, args) => {
    let prefix = await client.db.get(`prefix_${message.guild.id}`);
    if (prefix === null) prefix = client.prefix;

/**
 * {
        label: ' AntiNuke',
        emoji: `${client.emoji.antinuke}`,
        value: 'antinuke',
      
      },
 */
    if (!args[0]) {
     const rw = new ActionRowBuilder()
     .addComponents(new SelectMenuBuilder()
     .setCustomId('helpop')
     .setPlaceholder('Browse Commands!')
     .addOptions([
      
      {
        label: ' Home',
        emoji: `${client.emoji.home}`,
        value: 'home',
      
      },
      
      {
        label: ' Moderation',
        emoji: `${client.emoji.mod}`,
        value: 'mod',
     
      },
      {
        label: ' Automod',
        emoji: `${client.emoji.automod}`,
        value: 'automod',
       
      },
      {
        label: ' Utility',
        emoji: `${client.emoji.utility}`,
        value: 'utility',
       
      },
         {
        label: ' Settings',
        emoji: `${client.emoji.settings}`,
        value: 'settings',
       
      },
        
      {
        label: ' Information',
        emoji: `${client.emoji.info}`,
        value: 'info',
       
      },
      
      {
        label: 'Welcomer',
        emoji: `${client.emoji.welcome}`,
        value: 'welcome',
       
      },
         {
        label: ' Voice Moderation',
        emoji: `${client.emoji.voice}`,
        value: 'vmod',
       
      },
         {
        label: ' Custom Roles',
        emoji: `${client.emoji.customrole}`,
        value: 'customroles',
       
      },
         {
        label: ' Economy',
        emoji: `${client.emoji.coin}`,
        value: 'economy',
       
      },
      
    ]))
      const embed = new EmbedBuilder()
        .setAuthor({name:`${client.user.username}'s Help Menu`, iconURL: client.user.displayAvatarURL()})
        .setDescription(`
        Hey, i am <@${client.user.id}> i have many awesome features listed below.
        ${client.emoji.home} **Help Menu:**
         My prefix here is: ${prefix}
         Use select menu for commands.
         For further help [click here](${client.config.links.dc}).      
         ${client.emoji.modules} **Categories:**
         ${client.emoji.dot} Moderation
         ${client.emoji.dot} Automod
         ${client.emoji.dot} Utility         
         ${client.emoji.dot} Settings
         ${client.emoji.dot} Information
         ${client.emoji.dot} Welcomer
         ${client.emoji.dot} Voice Moderation
         ${client.emoji.dot} Custom Roles
         ${client.emoji.dot} Economy

         ${client.emoji.link} **Links**
         [Invite ${client.user.username}](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=applications.commands%20bot) | [Support HQ](${client.config.links.dc})
        `)
        

        .setFooter({text: `Type ${prefix}help <command_name> for more information.`})
        
        .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor);
      return message.channel.send({ embeds: [embed],components:[rw] });
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new EmbedBuilder()
          .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`)

          .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor);
        return message.channel.send({embeds: [embed]});
      }

      const embed = new EmbedBuilder()
        .setAuthor({name:`${client.user.username} Command Help`, iconURL:client.user.displayAvatarURL(),url:"https://discord.gg/wrCzESkVzK"})
      
        .addFields({
          name:"🏷️ Command Name",
          value:command.name ? `\`\`\`js\n${command.name}\`\`\`` : "No name for this command.",inline:true
         },
         {
          name: "🛰️ Aliases",
          value:command.aliases
            ? `\`\`\`js\n${command.aliases.join(",")}\`\`\``
            : "No aliases for this command.",inline:true
         },
         {
         name:"📖 About",
         value:command.description
         ? `\`\`\`js\n${command.description}\`\`\``
         : "No description for this command."
         },
         {
          name: "📋 Usage",
          value:command.usage
            ? `\`\`\`js\n${prefix}${command.usage}\`\`\``
            : `\`\`\`js\n${prefix}${command.name}\`\`\``
         },
         {
          name:"⏲️ Cooldown",
          value:command.cooldown ? `\`\`\`js\n${command.cooldown} seconds\`\`\`` : "No Cooldown for this command."
         },
         {
          name:"🔐 Permissions",
          value:command.userPerms || command.botPerms ? `\`\`\`js\n${command.userPerms.join(",") || command.botPerms.join(",")}\`\`\`` : "No Special Permission Required"
         }
         )
        
     
        .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor);
      return message.channel.send({embeds:[embed]});
    }

  }
}