const { Discord, userMention } = require("discord.js")
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "addpremium",
    aliases: ["addprem", "premium+"],
    category: "Owner",
    args: true,
    description: "",
    args: false,
    owner: true,
    run: async (client, message, args) => {
    const em1 = new EmbedBuilder();
    let time;
    let count;
  if (!client.config.owner.includes(message.author.id)) {
     return;
  };
  let arr = [];
  const embed = new EmbedBuilder()
  .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
  if(args[0]){
  try {
    await client.users.fetch(args[0])
  } catch (error) {
    return message.channel.send("Invalid Id");
  }
  if(args[1])
  {
    time = Date.now() + 86400000 * args[1];
  }
  else if(!args[1])
  {
    time = Date.now() + 86400000 * 1;
  }
  if(args[2]){
    count = args[2];
  }
  if(!args[2]){
    count = 0;
  }
  client.db.set(`uprem_${args[0]}`, `true`)
  client.db.set(`upremend_${args[0]}`, time)
  client.db.set(`upremcount_${args[0]}`, count)
  client.db.set(`upremserver_${args[0]}`, arr)
  return message.channel.send({embeds: [embed.setAuthor({name:`Premium Activated`,iconURL:client.user.displayAvatarURL()}).setDescription(` 
  > Successfully Activated User Premium
  >  
  > User: <@${args[0]}> 
  > UserID: ${args[0]}
  > Premium Count: \`${count}\`   
  > Premium Expiring - <t:${Math.round(time / 1000)}>`)]})
  }
  else return message.channel.send({embeds: [embed.setDescription(`Please Give The User Id`)]})
    }
}
/*
Math.round((Date.now() + 86400000 * 1) / 1000)
*/