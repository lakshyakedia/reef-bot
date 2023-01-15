
const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");
const User = require('../../Models/User.js');
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "addspace",
    description: "Gives The balance of an user",
  category:'Owner',
    aliases:[''],
  cooldown: 5,
   
    run: async (client, message, args, prefix) => {

      const user = message.mentions.users.first() || client.cache.users.get(args[0]);
      if (!user) return message.reply({ content: `Please mention a user or provide a valid user id`})
     const result = await User.findOne({ userId: user.id }) || new User({ userId: user.id })
     let amount = parseInt(args[1]);
      if (isNaN(amount)) return message.reply({ content: `Please provide a valid number`})
      
if (!client.config.owner.includes(message.author.id))  return message.reply("You can't use it!")

        result.space +=amount
        result.save()

         return message.reply("done")

        }
     
}
    
