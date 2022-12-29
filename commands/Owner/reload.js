const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, AttachmentBuilder } = require("discord.js");

const { post } = require("node-superfetch");

module.exports = {
  name: "reload",
  description:"reloads the cmd ",
  aliases:['rr'],
  owner:true,
  run: async (client, message, args) => {
 const row = new ActionRowBuilder()
           .addComponents(new ButtonBuilder()
    .setEmoji("993492852023762965")
    .setCustomId('DELETE_BUT')
    .setStyle("Danger"));

    if (!args[0]) {
        const opp = new EmbedBuilder()
        .setColor("#ff0000")
        .setDescription(`Please include the command`)
        return message.channel.send({embeds: [opp]})
      }
  let reload = false;
  for (let i = 0; i < client.categories.length; i += 1) {
    let dir = client.categories[i];
    try {
      delete require.cache[require.resolve(`../../commands/${dir}/${args[0]}.js`)] // usage !reload <name>
      client.commands.delete(args[0])
      const pull = require(`../../commands/${dir}/${args[0]}.js`)
      client.commands.set(args[0], pull)
      reload = true;
    } catch {}
  }
  if (reload) {
    const op = new EmbedBuilder()
    .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
    .setDescription(`${client.emoji.right} Reloaded \`${args[0]}\``)
    return message.channel.send({embeds: [op]})
  }
  const notop = new EmbedBuilder()
  .setColor("#ff0000")
  .setDescription(`${client.emoji.wrong} Could not reload: \`${args[0]}\``)
  return message.channel.send({embeds: [notop]});
    }
}