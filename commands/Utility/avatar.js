const {  EmbedBuilder } = require("discord.js");
const { arch } = require("os");
const { botPerms } = require("./help");

module.exports = {
  name: "avatar",
  aliases: ['av' , 'photo'],
  category: 'info',
  run: async (client, message, args) => {
    await message.guild.members.fetch();
    
   let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || client.users.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;

      let uc = message.guild.members.cache;
if(message.guild.members.cache.get(member.id)){
 
    const embed = new EmbedBuilder()
    .setImage(member.displayAvatarURL({ dynamic: true, size: 2048 }))  
    .setColor(client.config.embedColor)
   
    .setDescription(`[\`PNG\`](${member.displayAvatarURL({ dynamic: true, size: 2048, format: "png" })}) | [\`JPG\`](${member.displayAvatarURL({ dynamic: true, size: 2048, format: "jpg" })}) | [\`WEBP\`](${member.displayAvatarURL({ dynamic: true, size: 2048, format: "webp" })}) `);

   return message.reply({ embeds: [embed] })
}else{
  await client.users.fetch(args[0])
  member = client.users.cache.get(args[0]);
  
  const embed = new EmbedBuilder()
  .setImage(member.avatarURL({ dynamic: true, size: 2048 }))    
    .setColor(client.config.embedColor)
    
      .setDescription(`[\`PNG\`](${member.avatarURL({ dynamic: true, size: 2048, format: "png" })}) | [\`JPG\`](${member.avatarURL({ dynamic: true, size: 2048, format: "jpg" })}) | [\`WEBP\`](${member.avatarURL({ dynamic: true, size: 2048, format: "webp" })}) `);
  
    message.reply({ embeds: [embed] })
}
  }
}