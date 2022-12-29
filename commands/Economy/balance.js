
const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
module.exports = {
    name: "balance",
    description: "Gives The balance of an user",
  category:'economy',
    aliases:['bal'],
  cooldown: 5,

   
    run: async (client, message, args, prefix) => {
        
        const user = message.mentions.users.first() || message.author;
        let result = await cs.balance({
            user: user,
            guild:{id: null}
      
        });
        const ems = new EmbedBuilder()
        .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
        .setTitle(`${user.tag}'s Bank Information`)
        .setDescription(`
        ${client.emoji.wallet} Wallet: ${result.wallet}
        ${client.emoji.bank} Bank: ${result.bank}
        ${client.emoji.bank} Bank Space: ${(result.rawData.bankSpace.toLocaleString())}
         `)
        return message.reply({embeds: [ems]});

    }
}