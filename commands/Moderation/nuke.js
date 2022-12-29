const { ButtonStyle } = require('discord.js')
const { Message, Client, EmbedBuilder, ActionRowBuilder, ButtonBuilder, SelectMenuBuilder } = require("discord.js");

module.exports = {
  name: "nuke",
  category: 'mod',
  run: async (client, message, args) => {
    if (!message.member.permissions.has('ManageChannels')){
      let error = new EmbedBuilder()
        .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
        .setDescription(`You must have \`Manage Channels\` permission to use this command.`)
      return message.reply({embeds: [error]});
    }
    try{
      let row = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId("YES").setStyle(ButtonStyle.Success).setLabel("Yes"),
        new ButtonBuilder().setCustomId("NO").setStyle(ButtonStyle.Danger).setLabel("No")
      );
      const embed = new EmbedBuilder()
        .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
        .setDescription(`Are you sure that you want to nuke this channel.`)
      let msg = await message.reply({embeds: [embed], components: [row]});
      const filter = (interaction) => {
        if (interaction.user.id === message.author.id) return true;
        return interaction.reply({
          content: `Only ${message.author.username} Can Use These Buttons`,
          ephemeral: true,
        });
      };
      const collector = message.channel.createMessageComponentCollector({
        filter,
        max: 1,
      });
      
      collector.on("collect", (buttonInteraction) => {
        const id = buttonInteraction.customId;
        if (id === "YES") {
          message.channel.clone().then((ch) => {
            let reason = args.join(" ") || "No Reason";
            let embed = new EmbedBuilder().setTitle("**Channel Succesfuly Nuked**").setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor);
            ch.setParent(message.channel.parent);
            ch.setPosition(message.channel.position);
            message.channel.delete().then(() => {
              ch.send({ embeds: [embed] }).then((msg) => {
                setTimeout(() => msg.delete(), 5000);
              });
            });
          });
        }
        if (id === "NO") {
          msg.delete().catch((e) => {})
        }
      })
    }catch(err){
      return message.channel.send({embeds: [new EmbedBuilder().setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor).setDescription(`I was unable to nuke this channel.`)]})
    }
  }
}