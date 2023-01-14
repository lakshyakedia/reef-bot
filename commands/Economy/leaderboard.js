
const { EmbedBuilder, PermissionsBitField, Discord } = require("discord.js");
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
module.exports = {
    name: "leaderboard",
    description: "Show Guild's Leaderboard",
  category:'economy',
    aliases:['lb'],
  cooldown: 5,

   
    run: async (client, message, args, prefix) => {
      const daily = new EmbedBuilder()
        .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
        .setDescription(`
        Nobody\'s in the leaderboard yet.`)
        let data = await cs.globalLeaderboard();
  if (data.length < 1) return message.reply({embeds:[daily]});
  const msg = new EmbedBuilder();
      msg.setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor);
  let pos = 0;
  // This is to get First 10 Users )
  let arr = [];
  data.slice(0, 10).map((e) => {
    if (!client.users.cache.get(e.userID)) return;
    pos++;
    arr.push({
      name: `${pos} • **${client.users.cache.get(e.userID).username}**`,
      value: `<a:wallet:1055761007789748275> Wallet: <a:bitcoin:1055862360713220237>**${e.wallet}** • <:ecobank:1055873821590175784> Bank: <a:bitcoin:1055862360713220237> **${e.bank}**`,
      inline: false,
    });
  });
  msg.addFields(arr);
  message
    .reply({
      embeds: [msg],
    })
    .catch();
       
    }
                }



          //AM AFK lOL
          //Run this stream in background i need watchtime