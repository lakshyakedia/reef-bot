
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
        .setDescription(`<:store:1055863295757783132> Shop`)
        let result = await cs.getShopItems({
   
  });
  let inv = result.inventory;
  
  let arr = [];
  for (let key in inv) {
    let em = inv[key].name;
    
    let e;
    if(em === 'Laptop')
    e= "<:laptop:1055862662380142684>";
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
    arr.push({
      name: `${parseInt(key) + 1} - ${e} **${inv[key].name}:**  <a:bitcoin:1055862360713220237>${
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