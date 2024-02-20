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

          if (funny === 'mod') {
            _commands = client.commands.filter((x) => x.category && x.category === "mod").map((x) => `\`${x.name}\``);
            embed.addFields({name: ` <:40:1052589138819436624> **Moderation \`[${_commands.length}]\`**`,value: _commands.sort().join(", ")})
            interaction.update({
              embeds: [embed],
              ephemeral: true
            }).catch((_) => { })
            return
          }
          if (funny === 'utility') {
            _commands = client.commands.filter((x) => x.category && x.category === "utility").map((x) => `\`${x.name}\``);
            embed.addFields({name: ` <:3_:1052589023794823249> **Utility \`[${_commands.length}]\`**`,value: _commands.sort().join(", ")})
            interaction.update({
              embeds: [embed],
              ephemeral: true
            }).catch((_) => { })
            return
          }
        if (funny === 'settings') {
            _commands = client.commands.filter((x) => x.category && x.category === "settings").map((x) => `\`${x.name}\``);
            embed.addFields({name: ` <:10:1052589041717092412> **Settings \`[${_commands.length}]\`**`,value: _commands.sort().join(", ")})
            interaction.update({
              embeds: [embed],
              ephemeral: true
            }).catch((_) => { })
            return
          }
          if (funny === 'info') {
            _commands = client.commands.filter((x) => x.category && x.category === "info").map((x) => `\`${x.name}\``);
            embed.addFields({name: ` <:27:1052589100458315776> **Information \`[${_commands.length}]\`**`,value: _commands.sort().join(", ")})
            interaction.update({
              embeds: [embed],
              ephemeral: true
            }).catch((_) => { })
            return
          }
          if (funny === 'welcome') {
            _commands = client.commands.filter((x) => x.category && x.category === "welcome").map((x) => `\`${x.name}\``);
            embed.addFields({name: ` <a:welcome:1054639371657162812> **Welcome \`[${_commands.length}]\`**`,value: _commands.sort().join(", ")})
            interaction.update({
              embeds: [embed],
              ephemeral: true
            }).catch((_) => { })
            return
          }
       
        if (funny === 'economy') {
            _commands = client.commands.filter((x) => x.category && x.category === "economy").map((x) => `\`${x.name}\``);
            embed.addFields({name: ` <a:bitcoin:1055862360713220237> **Economy \`[${_commands.length}]\`**`,value: _commands.sort().join(", ")})
            interaction.update({
              embeds: [embed],
              ephemeral: true
            }).catch((_) => { })
            return
          }
          if (funny === 'home') {
            const ehome = new EmbedBuilder()
            .setAuthor({name:`${client.user.username}'s Panel`, iconURL: client.user.displayAvatarURL()})
            .setDescription(`<:46:1052589156787814481> **General Help**
             My prefix here is: ${prefix}
             Use select menu for commands.
             For further help [click here](${client.config.links.dc}).      
             <:module:1054660233710022728> **Modules**
             <a:dot:1052593815900409956> Moderation
             <a:dot:1052593815900409956> Utility
             <a:dot:1052593815900409956> Welcomer
             <a:dot:1052593815900409956> Settings
             <a:dot:1052593815900409956> Information
    
             <:27:1052589100458315776> **Quick Links**
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
            .setDescription(`<:11:1052589045374533653> Please wait \`${slash(interaction, command).toFixed(1)}\` Before using the \`${command.name}\` command again!`)
                  
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
