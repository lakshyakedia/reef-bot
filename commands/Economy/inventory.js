
const { EmbedBuilder, PermissionsBitField, Discord } = require("discord.js");
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
module.exports = {
    name: "inventory",
    description: "Show User's Inventory",
  category:'economy',
    aliases:['invent'],
  cooldown: 5,

   
    run: async (client, message, args, prefix) => {
      const embed = new EmbedBuilder()
        .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
        .setDescription(`${client.emoji.inventory} Your Inventory is Empty.`)
      const user = message.mentions.users.first() || message.author; 
       let result = await cs.getUserItems({
    user: user,
    guild:{id: null}
  });
         let inv = result.inventory.slice(0, 10);
        let arr = [];
  for (key of inv) {
    let em = key.name;
    
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
    arr.push({ name: `**${e} ${key.name}:**`, value: `Amount: ${client.emoji.coin}${key.amount}` });
    embed.setDescription(`${client.emoji.inventory} Your Inventory!`);
  }
  embed.addFields(arr);
  return message.reply({
    embeds: [embed],
  });
}
  
    }