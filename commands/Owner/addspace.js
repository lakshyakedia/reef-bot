
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

        const user = message.mentions.users.first() || message.author;
     const result = await User.findOne({ userId: user.id }) || new User({ userId: user.id })
     let amount = parseInt(args[1]);
     //let result = await User.findOne({userId: user.id}) || new User({ userId: user.id }).save()
   // embed = new MessageEmbed({ color: "#2F3136" })
if (!client.config.owner.includes(message.author.id))  return message.reply("You can't use it!")

            

        
     
        result.space +=amount
        result.save()
        

        
         return message.reply("done")

            
             // const ems = new EmbedBuilder()
        //.setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
      //  .setTitle(`${user.tag}'s Bank Information`)
     //   .setDescription(`done`)
       // return //message.reply({embeds: [ems]});
        }
     
}
    
