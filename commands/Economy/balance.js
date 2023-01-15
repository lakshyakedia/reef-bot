const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");
const User = require('../../Models/User.js');

module.exports = {
    name: "balance",
    description: "Gives The balance of an user",
  category:'economy',
    aliases:['bal'],
  cooldown: 5,
   
    run: async (client, message, args, prefix) => {

        const user = message.mentions.users.first() || message.author;
     const result = await User.findOne({ userId: user.id }) || new User({ userId: user.id })
   let per = Math.floor(result.bank/result.space * 100)
     let net = Math.floor(result.bank + result.wallet)
     const ems = new EmbedBuilder()
        .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
        .setTitle(`${user.tag}'s Bank Information`)
   
  .setDescription(`Note: wallet and bank details of requested user`)
        //.setColor("YELLOW")
        .setThumbnail(user.displayAvatarURL())
      .addFields([{ name: 'Wallet', value:`⌬ ${result.wallet}`},
{ name: 'Bank', value: `⌬ ${result.bank} / ${result.space} (${per.replace(/NaN/g, "0")}%)`},
                  { name: 'Net Worth', value: `⌬ ${net}
`},
  ]);
        return message.reply({embeds: [ems]});
        
     

    }
}