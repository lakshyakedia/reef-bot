const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "greroll",
  category: 'giveaway',
  userPerms:['ManageGuild'],
  run: async (client, message, args) => {
  
    let messageId = args[0];
    if(!messageId){
      return message.reply({embeds: [new EmbedBuilder().setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor).setDescription(`${message.guild.prefix}greroll <message id>`)]})
    }
    const response = await reroll(message.member, messageId);
    message.reply(response);
  }
}

async function reroll(member, messageId){
  const embed = new EmbedBuilder();
  embed.setColor(member.client.color);
  if (!messageId) return {embeds: [embed.setDescription("You must provide a valid message id.")]};

  
  const giveaway = member.client.giveawaysManager.giveaways.find(
    (g) => g.messageId === messageId && g.guildId === member.guild.id
  );

  if (!giveaway) return {embeds: [embed.setDescription(`Could not find a giveaway with the ID: \`${messageId}\``)]};

  if (!giveaway.ended) return {embeds: [embed.setDescription("The giveaway has not ended yet.")]};

  try {
    await giveaway.reroll();
    return {embeds: [embed.setColor(member.client.config.embedColor).setDescription(`Successfully rerolled the giveaway: \`${messageId}\`!`)]};
  } catch (error) {
    member.client.logger.error("Giveaway Reroll", error);
    return {embeds: [embed.setDescription(`I was unable to reroll the giveaway with ID: \`${messageId}\`!`)]}
  }
}