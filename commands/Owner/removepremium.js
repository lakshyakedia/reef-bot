const { Discord } = require("discord.js")
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "removepremium",
    aliases: ["remprem", "premium-"],
    category: "Owner",
    args: true,
    description: "",
    args: false,
    permission: [],
    owner: true,
    run: async (client, message, args) => {
    const em1 = new EmbedBuilder();
  if (!client.config.owner.includes(message.author.id)) {
     return;
  };
  const embed = new EmbedBuilder()
  .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
  if(args[0]){
  try {
    await client.users.fetch(args[0])
  } catch (error) {
    return message.channel.send("Invalid Id");
  }
  const use = await client.db.get(`uprem_${args[0]}`)
  if(!use){
  return message.channel.send({embeds: [embed.setDescription(`<@${args[0]}> Is Not A Premium User Only!`)]})
  }
  await client.db.delete(`uprem_${args[0]}`)
  await client.db.delete(`upremend_${args[0]}`)
  await client.db.delete(`upremcount_${args[0]}`)
  await client.db.delete(`upremserver_${args[0]}`)
  return message.channel.send({embeds: [embed.setDescription(`<@${args[0]}> Has Been Removed From A Premium User.`)]})
  }
  else return message.channel.send({embeds: [embed.setDescription(`Please Give The User Id`)]})
    }
}