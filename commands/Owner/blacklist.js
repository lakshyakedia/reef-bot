const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, AttachmentBuilder } = require(`discord.js`);
const User = require('../../Models/User');


module.exports = {
  name: `blacklist`,
  description:`blacklist the user`,
  aliases:['blc'],
  owner:true,
  run: async (client, message, args) => {
     
      const embed= new EmbedBuilder();
      embed.setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor);
 const row = new ActionRowBuilder()
           .addComponents(new ButtonBuilder()
    .setEmoji(`993492852023762965`)
    .setCustomId('DELETE_BUT')
    .setStyle(`Danger`));

     

      const em1 = new EmbedBuilder();
      const nembed = new EmbedBuilder()
      .setColor(`${client.config.embedColor}`)
      .setDescription(`<:11:1052589045374533653> You are not allowed to run this command! Only the Owners are allowed to run this command!`)            
      .setFooter({text:message.author.tag})
  
  if (!client.config.owner.includes(message.author.id)) return message.channel.send({
      embeds: [nembed]
  });
        



  
  
          let member = message.mentions.users.first() || client.users.cache.get(args[0]);
          if(!member) return message.reply(`No member found!`)
          if(client.config.owner.includes(member.id)) return message.reply(`Cannot Blacklist Bot Owners.`)
  
          let user = await User.findOne({ userId: member.id }) || new User({ userId: member.id })
     
  if(!user.blacklisted){
      user.blacklisted = true;
      await user.save();
  
  
      return  message.reply(`User has been blacklisted from bot`)
  }
  if(user.blacklisted){
    user.blacklisted = false;
    await user.save();


    return  message.reply(`User has been removed from blacklistt`)
}

}
}