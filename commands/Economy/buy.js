
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
        if(!thing) return message.reply({embeds: [embed.setDescription(`<:11:1052589045374533653> Provide a Valid Item Number`)]})
        if(isNaN(thing)) return message.reply({embeds: [embed.setDescription(`<:11:1052589045374533653> Provide a Valid Item Number`)]})

  let result = await cs.buy({
    user: message.author,
    guild: {id: null},
    item: parseInt(args[0]),
    amount: parseInt(args[1]) || 1,
  });
  
  
    if (result.error) {
      if (result.type === "No-Item")
      return message.reply({
        embeds: [embed.setDescription(`<:11:1052589045374533653> Please Provide a Valid Item Number.`)],
      });
      if (result.type === "Invalid-Item")
      return message.reply({
        embeds: [embed.setDescription(`<:11:1052589045374533653> The Item Does not Exists.`)],
      });
      if (result.type === "low-money")
      return message.reply({
        embeds: [embed.setDescription(`<:11:1052589045374533653> Ypu Don\'t Have Enough Money On Your Wallet.`)],
      });
      if (result.type === "Invalid-Amount")
      return message.reply({
        embeds: [embed.setDescription(`<:11:1052589045374533653> Can\'t Add less than 1 Item.`)],
      });
    } else{
    let em = result.inventory.name;
    
    let e;
    if(em === 'Laptop')
    e= <:laptop:1055862662380142684>;
    if(em === 'Rolex')
    e= "<:rolex:1056942672385953933>";
    if(em === 'Bank Note')
    e= "<:Banknote2:1056943624874639392>";
    if(em === 'Iphone')
    e= "<:iphone12max:1056942815646580798>";
    if(em === 'Chill Pill')
    e= "<:chillpill:1057202298910158879>";
    if(em === 'Garbage')
    e= "<:garbage:1057202722971070474>";
    if(em === 'Fake Id')
    e= "<:fakeid:1057202440811855953>";
    if(em === 'Rifle')
    e= "<:rifle:1057202795196973079>";
    if(em === 'Junk')
    e= "<:junk:1057202655551832105>";
    if(em === 'Landmine')
    e= "<:landmine:1057202882887299172>";
   
    return message.reply({
      embeds: [embed.setDescription(`<:10:1052589041717092412> Successfully Bought ${parseInt(args[1]) || 1}  ${e}${result.inventory.name} 
      Deducted Amount From Wallet: <a:bitcoin:1055862360713220237>${result.price} `)],
    });
      
      }
}
  
    }