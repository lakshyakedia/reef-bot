const Discord = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, message } = require('discord.js')

module.exports = {
    name: "feedback",
    category: 'utility',
    description: "feedback command",
    cooldown:5,
    aliases: ["feedback"],
    
    
    botPerms: ['ViewChannel','EmbedLinks','UseExternalEmojis'],
userPerms: ['ViewChannel'],
    usage: "feedback",
     async run(client, message, args) {
const user = message.author;
        if(!args[0]) {
            const embed = new EmbedBuilder()
            .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
            .setDescription(`Please write the feedback message to send`)
             message.channel.send({embeds: [embed]})
} else { 
   
    const row = new ActionRowBuilder()
           .addComponents(
               new ButtonBuilder()
    .setEmoji("995665552133607434")
    .setCustomId('Done')
    .setStyle("Success"),
               
             new ButtonBuilder()
    .setEmoji("995665727690391582")
    .setCustomId('Undone')
    .setStyle("Danger")         
                         );
         const thing = new EmbedBuilder()
         .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
        .setAuthor({name:`Hey User Thanks for Giving Feedback`})
         .setDescription(`Are you satisfied?\n<a:ThumbsUp:995665552133607434> Click on this button if you are satisfied\n<a:SC_Thumbs_Down:995665727690391582> Click on this buttons if you are not satisfied\n\nMessage you provided for feedback is: ${args[0]}`)
         .setFooter({text:`Thank you for supporting and giving feedback`})
         
        message.channel.send({embeds: [thing], components: [row]});
    const ft = new EmbedBuilder()

        .setColor(`#63e963`)

        .setTitle(`${user.username}#${user.discriminator} (${user.id}) Feedback:`)

        .setDescription(`${args}`)

        .addFields({name:"On the server:",value: `${message.guild.name}`},

        {name:"Server ID:",value:`${message.guild.id}`})

        return client.channels.cache.get("979637918983417906").send({embeds: [ft]});
 }
             
    }
}