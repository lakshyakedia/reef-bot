
const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
module.exports = {
  name: "banknote",
  description: "A Way to increase Your Bank Space",
  usage: 'banknote <no of banknotes to use>',
  category: 'economy',
  aliases: ['banknote'],
  cooldown: 5,


  run: async (client, message, args, prefix) => {
    const errus = new EmbedBuilder()
      .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
      .setTitle(`An Error Occurred!`)

    const arr = await cs.getUserItems({
      user: message.author,
      guild: { id: null },
    });
    if (!arr.inventory.length)
      return message.reply({ embeds: [errus.setDescription(`<:11:1052589045374533653> You Dont\'t Have Any Banknotes!\n Please Buy Some From Shop.`)] });
    for (i in arr.inventory) {
      if (arr.inventory[i].name.toLowerCase().includes("bank note")) {
        i++;
        const removeItem = await cs.removeUserItem({
          user: message.author,
          item: i,
          guild: { id: null },
          amount: parseInt(args[0]) || 1,
        });
        if (removeItem.error) {
          console.log("Bot tried to remove item number " + i);
          return message.reply({ embeds: [errus.setDescription(`<:11:1052589045374533653> Unknown Error Occurred Please Send A Screenshot of this message to Support Server`)] });
        }
        const ToincreasedAmount = 5000 + removeItem.rawData.bankSpace;
        const result = await cs.setBankSpace(
          message.author.id,
          null,
          ToincreasedAmount
        );

        if (!result.error) {
          const ems = new EmbedBuilder()
            .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)

            .setDescription(`<:10:1052589041717092412> Successfully Updated The Bank Space
            <:ecobank:1055873821590175784> Current bank Space: ${result.amount}`)
          return message.reply({ embeds: [ems] });
        } else return message.reply({ embeds: [errus.setDescription(`<:11:1052589045374533653> ${result.error}`)] });
      } else return message.reply({ embeds: [errus.setDescription(`<:11:1052589045374533653> You Dont\'t Have Any Banknotes!\n Please Buy Some From Shop.`)] });
    }



  }
}