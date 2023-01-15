
const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");
const User = require('../../Models/User.js');
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "addbal",
    description: "Gives The balance of an user",
  category:'Owner',
    aliases:['addwallet'],
  cooldown: 5,
   
    run: async (client, message, args, prefix) => {
    
if (!client.config.owner.includes(message.author.id))  return message.reply("You can't use it!")

 const user = message.mentions.users.first() || message.author;
    const amount = parseInt(args[1]);
    const result = await User.findOne({ userId: user.id }) || new User({ userId: user.id })
    result.wallet += amount
    result.save();
    message.reply({ content: `done`})

        }
     
}
    
