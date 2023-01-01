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
        emoji: `<:45:1052589154208325793>`,
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
        emoji: `<:46:1052589156787814481>`,
        value: 'home',
      
      },
      
      {
        label: ' Moderation',
        emoji: `<:40:1052589138819436624>`,
        value: 'mod',
     
      },
      {
        label: ' Automod',
        emoji: `<:4_:1052589026294632448>`,
        value: 'automod',
       
      },
      {
        label: ' Utility',
        emoji: `<:3_:1052589023794823249>`,
        value: 'utility',
       
      },
         {
        label: ' Settings',
        emoji: `<:10:1052589041717092412>`,
        value: 'settings',
       
      },
        
      {
        label: ' Information',
        emoji: `<:27:1052589100458315776>`,
        value: 'info',
       
      },
      
      {
        label: 'Welcomer',
        emoji: `<a:welcome:1054639371657162812>`,
        value: 'welcome',
       
      },
         {
        label: ' Voice Moderation',
        emoji: `<:50:1056096392860422236>`,
        value: 'vmod',
       
      },
         {
        label: ' Custom Roles',
        emoji: `<:52:1056096390079598673>`,
        value: 'customroles',
       
      },
         {
        label: ' Economy',
        emoji: `<a:bitcoin:1055862360713220237>`,
        value: 'economy',
       
      },
      
    ]))
      const embed = new EmbedBuilder()
        .setAuthor({name:`${client.user.username}'s Help Menu`, iconURL: client.user.displayAvatarURL()})
        .setDescription(`
        Hey, i am <@${client.user.id}> i have many awesome features listed below.
        <:46:1052589156787814481> **Help Menu:**
         My prefix here is: ${prefix}
         Use select menu for commands.
         For further help [click here](${client.config.links.dc}).      
         <:module:1054660233710022728> **Categories:**
         <a:dot:1052593815900409956> Moderation
         <a:dot:1052593815900409956> Automod
         <a:dot:1052593815900409956> Utility         
         <a:dot:1052593815900409956> Settings
         <a:dot:1052593815900409956> Information
         <a:dot:1052593815900409956> Welcomer
         <a:dot:1052593815900409956> Voice Moderation
         <a:dot:1052593815900409956> Custom Roles
         <a:dot:1052593815900409956> Economy

         <:27:1052589100458315776> **Links**
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