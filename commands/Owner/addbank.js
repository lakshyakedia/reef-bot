const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");
const User = require('../../Models/User.js');
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "addbank",
    description: "Gives money to bank of an user",
  category:'Owner',
    aliases:[''],
  cooldown: 5,
   
    run: async (client, message, args, prefix) => {
    
if (!client.config.owner.includes(message.author.id))  return message.reply("You can't use it!")

 const user = message.mentions.users.first() || message.author;
    const amount = parseInt(args[1]);
    const result = await User.findOne({ userId: user.id }) || new User({ userId: user.id })
    result.bank += amount
    result.save();
    message.reply({ content: `done`})

        }
     
}
    
