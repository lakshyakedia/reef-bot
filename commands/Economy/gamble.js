const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
  const min = 1;
  const max = 100;
  const t = Math.random() * (max - min) + min;
  

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

    
    if (!args[0]) return message.channel.send(`Enter an user to bet`)
    if (!args[1]) return message.channel.send(`Enter an amount to bet`)
    if (isNaN(args[1])) {
    return message.channel.send(`Thats not a valid number`)
    }
    if (args[1] < 1) return message.channel.send(`You can't gamble less than 1 coin!`)

let sendermoney = await cs.balance({
  user: sender,
  guild:{id: null}
});

let usermoney = await cs.balance({
  user: user,
  guild:{id: null}
});

if (!user) return message.channel.send(`You need to mention someone to gamble with!`)
if (args[1] > sendermoney.wallet) return message.channel.send(`You don't have enough coins to gamble!`)
if (args[1] > usermoney.wallet) return message.channel.send(`The user you are trying to gamble with doesn't have enough coins!`)
if (user.id == sender.id) return message.channel.send(`You can't gamble with yourself!`)
if (user.bot) return message.channel.send(`You can't gamble with a bot!`)

if (user && args[1] && !isNaN(args[1]) && args[1] > 0 && args[1] <= sendermoney.wallet && args[1] <= usermoney.wallet && user.id != sender.id && !user.bot) {
let amount = money;  
let row = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setLabel("Accept")
            .setStyle("Success")
            .setCustomId("accept"),
        new ButtonBuilder()
            .setLabel("Decline")
            .setStyle("Danger")
            .setCustomId("reject")
    )
let rowx = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setLabel("Accept")
            .setStyle("Success")
            .setCustomId("disabledAccept")
            .setDisabled(),
        new ButtonBuilder()
            .setLabel("Decline")
            .setStyle("Danger")
            .setCustomId("disabledReject")
            .setDisabled(true)
    )

      let msg = await message.channel.send({ content: `${user.username}, ${sender.username} invited you in ${args[1]} coins gamble.`, components: [row] })

    const filter = async (inter) => {
      if (user.id == inter.user.id) return true
      else {
          
          await inter.reply({ content: `${inter.user.tag}, Only **${user.tag}** can interact with buttons!`, ephemeral: true })
          return false
      }
  }
  const collector = await msg.createMessageComponentCollector({
      filter, time: 30000
  })
  let b = false
  collector.on('collect', async i => {
      await i.deferUpdate()
      if (i.customId === 'accept') {
          if (!b) {
              if (i.user.id == user.id) {
                  b = true
                  collector.stop()
              }
              check()
              return
            } }
            if (i.customId === 'reject') {
                collector.stop()
                return message.channel.send({ content: `Gamble aborted by **${i.user.tag}** !` })
            }

          })
        
        collector.on('end', () => {
            return msg.edit({ components: [rowx] })
        })

        async function check() {
          let ar
          let result = t
          if (result <= 50) ar = true
          else ar = false
          let msg = await message.channel.send("3..2..1")
          setTimeout(async () => {
              if (ar) {
                  /**
                   * sender Won!
                   */
                  let result = await cs.transferMoney({
                    user: user,
                    user2: sender,
                    guild: null,
                    amount: money
                  });
                  if (result.error) return interaction.reply(`${user} don't have enough money in your wallet.`);
  return msg.edit(`${sender} won **${args[1]}** ${amount <= 1 ? "credit" : "credits"}`)

   } else {
     /**
  * User Won!
  */

     let result = cs.transferMoney({
      user: sender,
      user2: user,
      guild: null,
      amount: money
    });

    if (result.error) return interaction.reply(`${sender} don't have enough money in your wallet.`);

  return msg.edit(`${user} won **${args[1]}** ${amount <= 1 ? "credit" : "credits"}`)
}
    }, 1500)
  }
      } }
    }