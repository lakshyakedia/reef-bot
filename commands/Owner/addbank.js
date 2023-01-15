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

const user = message.mentions.users.first() || client.cache.users.get(args[0]);
if (!user) return message.reply({ content: `Please mention a user or provide a valid user id`})
    const amount = parseInt(args[1]);
    if (isNaN(amount)) return message.reply({ content: `Please provide a valid number`})
    const result = await User.findOne({ userId: user.id }) || new User({ userId: user.id })
    result.bank += amount
    result.save();
    message.reply({ content: `done`})

        }
     
}
    
