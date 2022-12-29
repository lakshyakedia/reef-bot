const {  EmbedBuilder  } = require("discord.js");

module.exports = {
  name: "gend",
  category: 'giveaway',
  userPerms:['ManageGuild'],
  run: async (client, message, args) => {
  
    let messageId = args[0];
    if(!messageId){
      return message.reply({embeds: [new EmbedBuilder().setColor(client.config.embedColor).setDescription(`${message.guild.prefix}gend <message id>`)]})
    }
    const response = await end(message.member, messageId);
    message.reply(response);
  }
}

async function end(member, messageId){
  const embed = new EmbedBuilder();
  embed.setColor(member.client.config.embedColor);
  if (!messageId) return {embeds: [embed.setDescription("You must provide a valid message id.")]};

  const giveaway = member.client.giveawaysManager.giveaways.find(
    (g) => g.messageId === messageId && g.guildId === member.guild.id
  );

  if (!giveaway) return {embeds: [embed.setDescription(`Could not find a giveaway with the ID: \`${messageId}\``)]};

  if (giveaway.ended) return {embeds: [embed.setDescription("The giveaway has already ended.")]};

  try {
    await giveaway.end();
    return {embeds: [embed.setColor(client.config.embedColor).setDescription(`Successfully ended giveaway: \`${messageId}\`!`)]};
  } catch (error) {
    console.log(error);
    return {embeds: [embed.setDescription(`I was unable to end the giveaway with ID: \`${messageId}\`!`)]};
  }
}