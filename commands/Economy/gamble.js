const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType, MessageActionRow, MessageButton } = require("discord.js");
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
let sendermoney = await cs.balance({
  user: sender,
  guild:{id: null}
});

let usermoney = await cs.balance({
  user: user,
  guild:{id: null}
});


if (!user) return message.channel.send(`You need to mention someone to gamble with!`)
if (!args[1]) return message.channel.send(`Enter an amount to bet`)
if (isNaN(args[1])) {
return message.channel.send(`Thats not a valid number`)
}
if (args[1] < 1) return message.channel.send(`You can't gamble less than 1 coin!`)
if (args[1] > sendermoney.wallet) return message.channel.send(`You don't have enough coins to gamble!`)
if (args[1] > usermoney.wallet) return message.channel.send(`The user you are trying to gamble with doesn't have enough coins!`)
if (user.id == sender.id) return message.channel.send(`You can't gamble with yourself!`)
if (user.bot) return message.channel.send(`You can't gamble with a bot!`)

if (user && args[1] && !isNaN(args[1]) && args[1] > 0 && args[1] <= sendermoney.wallet && args[1] <= usermoney.wallet && user.id != sender.id && !user.bot) {
  
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

      let msg = await message.channel.send({ content: `${user}, ${sender.username} includes invited you in **${args[1]}** coins gamble.`, components: [row] })

    const filter = async (inter) => {
      if (user.id == inter.user.id || sender.id == inter.user.id) return true
      else {
          
          await inter.reply({ content: `<@${inter.user.id}> Only **Gamble Participants** can interact with buttons!`, ephemeral: true })
          return false
      }
  }
  const collector = await msg.createMessageComponentCollector({
      filter, time: 30000
  })
  let a = false, b = false
  collector.on('collect', async i => {
      await i.deferUpdate()
      if (i.customId === 'accept') {
          if (!a && !b) {
              if (i.user.id == sender.id) {
                  a = true
                  return message.channel.send(`You joined your **own**'s gamble, waiting for opponent to join !`)
              } else if (i.user.id == user.id) {
                  b = true
                  return message.channel.send(`You joined **${sender.tag}**'s gamble, waiting for opponent to join !`)
              }
          } else if (a && !b) {
              if (i.user.id == sender.id) return i.followUp({ content: `You have already joined your own gamble, waiting for opponent to join !`, ephemeral: true })
              collector.stop()
              message.channel.send(`You joined **${sender.tag}**'s gamble !`)
              check()
              return

            } else if (!a && b) {
              if (i.user.id == user.id) return i.followUp({ content: `You have already joined **${sender.tag}**'s gamble, waiting for opponent to join !`, ephemeral: true })
              collector.stop()
              message.channel.send(`You joined your **own**'s gamble !`)
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