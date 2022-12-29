
const { EmbedBuilder, PermissionsBitField, Discord } = require("discord.js");
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
module.exports = {
    name: "shop",
    description: "Shows shop items",
  category:'economy',
    aliases:['shop'],
  cooldown: 5,

   
    run: async (client, message, args, prefix) => {
      const embed = new EmbedBuilder()
        .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
        .setDescription(`${client.emoji.shop} Shop`)
        let result = await cs.getShopItems({
   
  });
  let inv = result.inventory;
  
  let arr = [];
  for (let key in inv) {
    let em = inv[key].name;
    
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
    arr.push({
      name: `${parseInt(key) + 1} - ${e} **${inv[key].name}:**  ${client.emoji.coin}${
        inv[key].price
      }`,
      value: "Description: " + inv[key].description,
    });
  }
  embed.addFields(arr);
  message.reply({
    embeds: [embed],
  });
}
  
    }