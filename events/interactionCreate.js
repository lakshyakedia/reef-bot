const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, Collection, PermissionsBitField, PermissionFlagsBits } = require('discord.js');




const User = require("../Models/User");

const { slash } = require(`${process.cwd()}/util/onCoolDown.js`);


module.exports.run = async (client, interaction, args) => {
   let user = await User.findOne({ userId: interaction.user.id }) || new User({ userId: interaction.user.id });
   let prefix = await client.db.get(`prefix_${interaction.guild.id}`);
   if (prefix === null) prefix = client.prefix;
  const music = new EmbedBuilder();
  music.setFooter({text:`Requested by ${interaction.user.tag}`})
  const embed = new EmbedBuilder();
  const premrow = new ActionRowBuilder()
     .addComponents(new ButtonBuilder()
     .setLabel("Premium")
     .setStyle("Link")
     .setURL("https://discord.gg/wrCzESkVzK"),
     new ButtonBuilder()
     .setLabel("Vote")
     .setStyle("Link")
     .setEmoji("985926662552178748")
     .setURL("https://top.gg/"));
        
     music.setColor(interaction.guild.members.me.displayHexColor !== '#000000' ? interaction.guild.members.me.displayHexColor : client.config.embedColor)

if(interaction.isButton()) {
 
           if(interaction.customId === 'announcement')
           {
    
              const channel = client.channels.cache.get('920657525270003772'); 
               try{
    let lm = channel.lastinteraction.content;
    
    music.setDescription(lm);
    interaction.reply({embeds:[music], ephemeral: true})
                  }catch(error) {
    music.setDescription(`No Annoncement has been made`)
    interaction.reply({embeds:[music], ephemeral: true})
    }
           }
     if(interaction.customId === 'patch')
           {
     const channel = client.channels.cache.get('1014451395648299098'); 
              try{
    let lm = channel.lastinteraction.content;
    
    
    music.setDescription(lm)
    interaction.reply({embeds:[music], ephemeral: true})
                  }catch(error){
  music.setDescription(`No Patches has been released`)
    interaction.reply({embeds:[music], ephemeral: true})
    }
         }
   
  


    }
    if(interaction.isSelectMenu())
    {
      let options = interaction.values;
      const funny = options[0];
          let _commands;
          const embed = new EmbedBuilder()
          .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()})
          .setColor(interaction.guild.members.me.displayHexColor !== '#000000' ? interaction.guild.members.me.displayHexColor : client.config.embedColor)
          if (funny === 'antinuke') {
            _commands = client.commands.filter((x) => x.category && x.category === "antinuke").map((x) => `\`${x.name}\``);
            embed.addFields({name: ` ${client.emoji.antinuke} **Antinuke \`[${_commands.length}]\`**`,value: _commands.sort().join(", ")})
            interaction.update({
              embeds: [embed],
              ephemeral: true
            }).catch((_) => { })
            return
          }
          if (funny === 'automod') {
            _commands = client.commands.filter((x) => x.category && x.category === "automod").map((x) => `\`${x.name}\``);
            embed.addFields({name: ` ${client.emoji.automod} **Automod \`[${_commands.length}]\`**`,value: _commands.sort().join(", ")})
            interaction.update({
              embeds: [embed],
              ephemeral: true
            }).catch((_) => { })
            return
          }
          if (funny === 'mod') {
            _commands = client.commands.filter((x) => x.category && x.category === "mod").map((x) => `\`${x.name}\``);
            embed.addFields({name: ` ${client.emoji.mod} **Moderation \`[${_commands.length}]\`**`,value: _commands.sort().join(", ")})
            interaction.update({
              embeds: [embed],
              ephemeral: true
            }).catch((_) => { })
            return
          }
          if (funny === 'utility') {
            _commands = client.commands.filter((x) => x.category && x.category === "utility").map((x) => `\`${x.name}\``);
            embed.addFields({name: ` ${client.emoji.utility} **Utility \`[${_commands.length}]\`**`,value: _commands.sort().join(", ")})
            interaction.update({
              embeds: [embed],
              ephemeral: true
            }).catch((_) => { })
            return
          }
        if (funny === 'settings') {
            _commands = client.commands.filter((x) => x.category && x.category === "settings").map((x) => `\`${x.name}\``);
            embed.addFields({name: ` ${client.emoji.settings} **Settings \`[${_commands.length}]\`**`,value: _commands.sort().join(", ")})
            interaction.update({
              embeds: [embed],
              ephemeral: true
            }).catch((_) => { })
            return
          }
          if (funny === 'info') {
            _commands = client.commands.filter((x) => x.category && x.category === "info").map((x) => `\`${x.name}\``);
            embed.addFields({name: ` ${client.emoji.info} **Information \`[${_commands.length}]\`**`,value: _commands.sort().join(", ")})
            interaction.update({
              embeds: [embed],
              ephemeral: true
            }).catch((_) => { })
            return
          }
          if (funny === 'welcome') {
            _commands = client.commands.filter((x) => x.category && x.category === "welcome").map((x) => `\`${x.name}\``);
            embed.addFields({name: ` ${client.emoji.welcome} **Welcome \`[${_commands.length}]\`**`,value: _commands.sort().join(", ")})
            interaction.update({
              embeds: [embed],
              ephemeral: true
            }).catch((_) => { })
            return
          }
         if (funny === 'vmod') {
            _commands = client.commands.filter((x) => x.category && x.category === "vmod").map((x) => `\`${x.name}\``);
            embed.addFields({name: ` ${client.emoji.voice} **Voice Moderation \`[${_commands.length}]\`**`,value: _commands.sort().join(", ")})
            interaction.update({
              embeds: [embed],
              ephemeral: true
            }).catch((_) => { })
            return
          }
        if (funny === 'customroles') {
            _commands = client.commands.filter((x) => x.category && x.category === "customroles").map((x) => `\`${x.name}\``);
            embed.addFields({name: ` ${client.emoji.customrole} **Custom Roles \`[${_commands.length}]\`**`,value: _commands.sort().join(", ")})
            interaction.update({
              embeds: [embed],
              ephemeral: true
            }).catch((_) => { })
            return
          }
        if (funny === 'economy') {
            _commands = client.commands.filter((x) => x.category && x.category === "economy").map((x) => `\`${x.name}\``);
            embed.addFields({name: ` ${client.emoji.coin} **Economy \`[${_commands.length}]\`**`,value: _commands.sort().join(", ")})
            interaction.update({
              embeds: [embed],
              ephemeral: true
            }).catch((_) => { })
            return
          }
          if (funny === 'home') {
            const ehome = new EmbedBuilder()
            .setAuthor({name:`${client.user.username}'s Panel`, iconURL: client.user.displayAvatarURL()})
            .setDescription(`${client.emoji.home} **General Help**
             My prefix here is: ${prefix}
             Use select menu for commands.
             For further help [click here](${client.config.links.dc}).      
             ${client.emoji.modules} **Modules**
             ${client.emoji.dot} Antinuke
             ${client.emoji.dot} Moderation
             ${client.emoji.dot} Automod
             ${client.emoji.dot} Utility
             ${client.emoji.dot} Welcomer
             ${client.emoji.dot} Settings
             ${client.emoji.dot} Information
    
             ${client.emoji.link} **Quick Links**
             [Get ${client.user.username}](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=applications.commands%20bot)| [Support HQ](${client.config.links.dc})
            `)
            
    
            .setFooter({text: `Type ${prefix}help <command name> for more information  on a command!`})
            
            .setColor(interaction.guild.members.me.displayHexColor !== '#000000' ? interaction.guild.members.me.displayHexColor : client.config.embedColor);
            interaction.update({
              embeds: [ehome],
              ephemeral: true
            }).catch((_) => { })
            return
          }


    }
if (interaction.isCommand()) {
   
        const command = client.slash.get(interaction.commandName);
        if (!command) return interaction.reply({ content: 'an Error Occured plz contact support server' });
       
        
if (!command) return

  

  if (command.cooldown && slash(interaction, command)) {
    return interaction.reply({
        ephemeral: true,
        embeds: [
            new EmbedBuilder()
            .setDescription(`${client.emoji.wrong} Please wait \`${slash(interaction, command).toFixed(1)}\` Before using the \`${command.name}\` command again!`)
                  
            .setColor(interaction.guild.members.me.displayHexColor !== '#000000' ? interaction.guild.members.me.displayHexColor : client.config.embedColor)
              
        ]
    })
}

//perms handler
  if (command.userPerms) {
    if (!interaction.member.permissions.has(PermissionsBitField.resolve(command.userPerms|| []))) return interaction.reply({
        content: `${interaction.member} You need \`${command.userPerms}\` permissions to use this command`}).then(setTimeout(() => interaction.deleteReply(), 5000))
}

if (command.botPerms) {
    if (!interaction.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(command.botPerms || []))) return interaction.reply({
        content: `${interaction.member} I don't have the \`${command.botPerms}\` permissions to run this command`}).then(setTimeout(() => interaction.deleteReply(), 5000))
};
    
    if (command.owner) {
      if (client.config.owner) {
        const devs = client.config.owner.find((x) => x === interaction.user.id);
        if (!devs)
          return interaction.reply({
            embeds: [music.setDescription('Only My Owners can use this command!')],
          });
      }
    }  
    if(user.blacklisted){
      return interaction.reply({embeds:[new EmbedBuilder().setColor(interaction.guild.members.me.displayHexColor !== '#000000' ? interaction.guild.members.me.displayHexColor : client.config.embedColor).setDescription('You are Blacklisted From Using the Bot\nYou can Appeal For Your Blacklist At Our Support Server.')]})
            }
      
    try {

      command.run(client, interaction)
      user.ccount++;
      await user.save();
  
  } catch (e) {

      interaction.reply({ content: e.interaction });


  }
  }
  
}
