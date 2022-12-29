
const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
module.exports = {
    name: "depositall",
    description: "Deposits a all Amount to Bank",
  category:'economy',
    aliases:['depmax','depall'],
  cooldown: 5,

   
    run: async (client, message, args, prefix) => {
       
        const user = message.mentions.users.first() || message.author;
         let res = await cs.balance({
        user: user,
        guild:{id: null}
      });
        
        let result = await cs.deposite({
            user: user,
            guild:{id: null},
            amount: res.wallet,
        });
      
        if (result.error) {
    if (result.type === "money"){
        const wrong = new EmbedBuilder()
        .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
        .setDescription(`${client.emoji.wrong} Enter an Amount to deposite first.`)
      return message.reply({embeds: [wrong]})
    }
    if (result.type === "negative-money"){
        const nm = new EmbedBuilder()
        .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
        .setDescription(`${client.emoji.wrong} You Can\'t Deposite Negative Money.`)
      return message.reply({embeds: [nm]})}
    if (result.type === "low-money"){   
        const lm = new EmbedBuilder()
        .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
        .setDescription(`${client.emoji.wrong} You Don\'t Have that much money in Your Wallet.`)
      return message.reply({embeds: [lm]})
                                    }
    if (result.type === "no-money"){   
        const lm = new EmbedBuilder()
        .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
        .setDescription(`${client.emoji.wrong} You Don\'t Have Money in Your Wallet.`)
      return message.reply({embeds: [lm]})
                                    }
      if (result.type === "bank-full"){   
        const lm = new EmbedBuilder()
        .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
        .setDescription(`${client.emoji.wrong} You\'re Bank is Full.\n It is on its maximum limit.`)
      return message.reply({embeds: [lm]})
                                    }
  } else {
    if (result.type === "all-success")
      {    
        const lms = new EmbedBuilder()
        .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
          .setDescription(`
Deposited all the amount To Bank.
**Updated Balance:**
${client.emoji.wallet} Wallet: ${client.emoji.coin}${result.rawData.wallet}
${client.emoji.bank} Bank: ${client.emoji.coin}${result.rawData.bank}`)
      return message.reply({embeds: [lms]})
                                    }
      if (result.type === "success"){
            const ems = new EmbedBuilder()
        .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
        .setDescription(`
Deposited all the amount To Bank.
**Updated Balance:**
${client.emoji.wallet} Wallet: ${client.emoji.coin}${result.rawData.wallet}
${client.emoji.bank} Bank: ${client.emoji.coin}${result.rawData.bank}`)
           
      return message.reply({embeds:[ems]})
  }
  }
        

    }
}