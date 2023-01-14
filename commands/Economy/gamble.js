const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType, MessageActionRow, MessageButton } = require("discord.js");
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;

module.exports = {
    name: "gamble",
    description: "Gamble with an user",
  category:'economy',
    aliases:['bet'],
  cooldown: 5,

  run: async (client, message, args, prefix) => {
    const user = message.mentions.users.first();
    let sender = message.author;
let money = args[1];
if (String(money).includes("-")) return interaction.reply("You can't send negitive money.")

let row = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setLabel("Accept")
            .setStyle("SUCCESS")
            .setCustomId("accept"),
        new MessageButton()
            .setLabel("Decline")
            .setStyle("DANGER")
            .setCustomId("reject")
    )
let rowx = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setLabel("Accept")
            .setStyle("SUCCESS")
            .setCustomId("disabledAccept")
            .setDisabled(),
        new MessageButton()
            .setLabel("Decline")
            .setStyle("DANGER")
            .setCustomId("disabledReject")
            .setDisabled()
    )

let wins = ["win", "lose"]
   let win = wins[Math.floor(Math.random() * wins.length)];

    if (isNaN(args[1])) {
    return message.channel.send(`Thats not a valid number`)
     } else try {
      var playingMessage = await message.channel.send(`${user}, ${sender.username} has invited you in **${args[1]}** coins gamble. accept or reject it!`);
      await playingMessage.react("✅");
      await playingMessage.react("❌")
  } catch (error) {
      console.error(error);
      return message.channel.send("Error: Try again.")
    }
    
    const filter = (reaction, user) => user.id !== message.client.user.id;
    var collector = playingMessage.createReactionCollector(filter, {
      time: 45000
      });

      collector.on("collect", async (reaction, user) => {

      switch (reaction.emoji.name) {
        case "✅":
         reaction.users.remove(user).catch(console.error);
         if (user !== message.mentions.users.first()) return;
         playingMessage.reactions.removeAll()
     {
    if (win === "win") {
     message.channel.send(`You joined ${sender.username}'s gamble!`).then(msg =>{
setTimeout(async function(){
  await msg.edit(`${sender} won **${args[1]}** coins!`)
},2000)

let result = cs.transferMoney({
  user: user,
  user2: sender,
  guild: null,
  amount: money
});
if (result.error) return interaction.reply(`${user} don't have enough money in your wallet.`);



})
   } else if (win === "lose") {
    message.channel.send(`You joined ${sender.username}'s gamble!`).then(msg =>{
setTimeout(async function(){
  await msg.edit(`${user} won **${args[1]}**   coins!`)
},2000)
let result = cs.transferMoney({
  user: sender,
  user2: user,
  guild: null,
  amount: money
});
if (result.error) return interaction.reply(`${sender} don't have enough money in your wallet.`);
})
    }
  }

          collector.stop();
         
          break;

        case "❌": {
          reaction.users.remove(user).catch(console.error);
          if (user !== message.mentions.users.first()) return;
          playingMessage.reactions.removeAll()
          message.channel.send(`Gamble request declined!`)
        }
          collector.stop();
          break;
        
        default:
          reaction.users.remove(user).catch(console.error);
          break;
          playingMessage.reactions.removeAll()
      } 
    })
  }
}; 