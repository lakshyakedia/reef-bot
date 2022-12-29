
const { EmbedBuilder, PermissionsBitField, Discord } = require("discord.js");
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
module.exports = {
    name: "buy",
    description: "buy some items from shop",
  category:'economy',
  usage:"buy <item_number> <amount>",
    aliases:['buy'],
  cooldown: 5,

   
    run: async (client, message, args, prefix) => {
      const embed = new EmbedBuilder()
        .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
        let thing = parseInt(args[0]);
        if(!thing) return message.reply({embeds: [embed.setDescription(`${client.emoji.wrong} Provide a Valid Item Number`)]})
        if(isNaN(thing)) return message.reply({embeds: [embed.setDescription(`${client.emoji.wrong} Provide a Valid Item Number`)]})

  let result = await cs.buy({
    user: message.author,
    guild: {id: null},
    item: parseInt(args[0]),
    amount: parseInt(args[1]) || 1,
  });
  
  
    if (result.error) {
      if (result.type === "No-Item")
      return message.reply({
        embeds: [embed.setDescription(`${client.emoji.wrong} Please Provide a Valid Item Number.`)],
      });
      if (result.type === "Invalid-Item")
      return message.reply({
        embeds: [embed.setDescription(`${client.emoji.wrong} The Item Does not Exists.`)],
      });
      if (result.type === "low-money")
      return message.reply({
        embeds: [embed.setDescription(`${client.emoji.wrong} Ypu Don\'t Have Enough Money On Your Wallet.`)],
      });
      if (result.type === "Invalid-Amount")
      return message.reply({
        embeds: [embed.setDescription(`${client.emoji.wrong} Can\'t Add less than 1 Item.`)],
      });
    } else{
    let em = result.inventory.name;
    
    let e;
    if(em === 'Laptop')
    e= client.emoji.laptop;
    if(em === 'Rolex')
    e= client.emoji.rolex;
    if(em === 'Bank Note')
    e= client.emoji.banknote;
    if(em === 'Iphone')
    e= client.emoji.iphone;
    if(em === 'Chill Pill')
    e= client.emoji.chillpill;
    if(em === 'Garbage')
    e= client.emoji.garbage;
    if(em === 'Fake Id')
    e= client.emoji.fakeid;
    if(em === 'Rifle')
    e= client.emoji.rifle;
    if(em === 'Junk')
    e= client.emoji.junk;
    if(em === 'Landmine')
    e= client.emoji.landmine;
   
    return message.reply({
      embeds: [embed.setDescription(`${client.emoji.right} Successfully Bought ${parseInt(args[1]) || 1}  ${e}${result.inventory.name} 
      Deducted Amount From Wallet: ${client.emoji.coin}${result.price} `)],
    });
      
      }
}
  
    }