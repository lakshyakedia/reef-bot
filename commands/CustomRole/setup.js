const { PermissionsBitField, EmbedBuilder,ActionRowBuilder,ButtonBuilder } = require("discord.js");

module.exports = {
  name: "setup",
  aliases: ['set', 'setuprole'],
  cooldown: 5,
    category : "customroles",
  run: async (client, message, args) => {

const list = args[0];

    if(message.member.permissions.has(PermissionsBitField.resolve('Administrator'))){
} else {
        const embed = new EmbedBuilder()
        .setDescription("You are not allowed to use these command !")
        .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
        return message.channel.send({embeds: [embed]})
    }

if(!list){
    const embed = new EmbedBuilder()
    .setAuthor({name: `${message.author.tag}`, iconURL: message.author.avatarURL({dynamic: true})})
    .addFields(
        { name: `````setup```, value: 'This command will show this page.', inline: false },
        { name: '```setup reqrole```', value: 'It will setup the required role to run some custom role commands.', inline: false },
        { name: '```setup official```', value: 'Sets the official role.', inline: false },
        { name: '```setup friend```', value: 'Sets the friend role.', inline: false },
        { name: '```setup guest```', value: 'Sets the guest role.', inline: false },
        { name: '```setup vip```', value: 'Sets the vip role.', inline: false },
        { name: '```setup girl```', value: 'Sets the girl role.', inline: false },
        { name: '```setup config```', value: 'Shows the current config of Custom Role.', inline: false },
        { name: '```setup reset```', value: 'Shows the current config of Custom Role.', inline: false },   
    )
    .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
    .setFooter({text: 'Note: At the time of providing Custom Roles, I`ll not provide the roles which have Administration Perms.'})
    message.channel.send({embeds: [embed]})
}

if(list === 'reqrole'){
    const role = message.mentions.roles.first() ||  message.guild.roles.cache.get(args[1])
    if(!role){
        const embed  = new EmbedBuilder()
        .setDescription('You have to provide the role !')
        .setColor('#303037')
        return  message.reply({embeds: [embed]})
    }
    if(role.permissions.has("Administrator") === true){
        const embed  = new EmbedBuilder()
        .setDescription('These Role Has Administrator , Try Again Later !')
        .setColor('#303037')
        return  message.reply({embeds: [embed]})
    }
    const findData = await client.db.get(`reqrole_${message.guild.id}`) || "no"
await client.db.set(`reqrole_${message.guild.id}`,role.id)
const embed  = new EmbedBuilder()
.setDescription(`Successfully added ${role} as Required Role.`)
.setColor('#303037')
message.channel.send({embeds: [embed]})
}

//
if(list === 'official'){
    const role = message.mentions.roles.first() ||  message.guild.roles.cache.get(args[1])
    if(!role){
        const embed  = new EmbedBuilder()
        .setDescription('You have to provide the role !')
        .setColor('#303037')
        return  message.reply({embeds: [embed]})
    }
    if(role.permissions.has("Administrator") === true){
        const embed  = new EmbedBuilder()
        .setDescription('These Role Has Administrator , Try Again Later !')
        .setColor('#303037')
        return  message.reply({embeds: [embed]})
    }

await client.db.set(`official_${message.guild.id}`,role.id)
const embed  = new EmbedBuilder()
.setDescription(`Successfully added ${role} as Official Role.`)
.setColor('#303037')
message.channel.send({embeds: [embed]})
}

if(list === 'friend'){
    const role = message.mentions.roles.first() ||  message.guild.roles.cache.get(args[1])
    if(!role){
        const embed  = new EmbedBuilder()
        .setDescription('You have to provide the role !')
        .setColor('#303037')
        return  message.reply({embeds: [embed]})
    }
    if(role.permissions.has("Administrator") === true){
        const embed  = new EmbedBuilder()
        .setDescription('These Role Has Administrator , Try Again Later !')
        .setColor('#303037')
        return  message.reply({embeds: [embed]})
    }

await client.db.set(`friend_${message.guild.id}`,role.id)
const embed  = new EmbedBuilder()
.setDescription(`Successfully added ${role} as Friend Role.`)
.setColor('#303037')
message.channel.send({embeds: [embed]})
}

//
if(list === 'guest'){
    const role = message.mentions.roles.first() ||  message.guild.roles.cache.get(args[1])
    if(!role){
        const embed  = new EmbedBuilder()
        .setDescription('You have to provide the role !')
        .setColor('#303037')
        return  message.reply({embeds: [embed]})
    }
    if(role.permissions.has("Administrator") === true){
        const embed  = new EmbedBuilder()
        .setDescription('These Role Has Administrator , Try Again Later !')
        .setColor('#303037')
        return  message.reply({embeds: [embed]})
    }
  
await client.db.set(`guest_${message.guild.id}`,role.id)
const embed  = new EmbedBuilder()
.setDescription(`Successfully added ${role} as Guest Role.`)
.setColor('#303037')
message.channel.send({embeds: [embed]})
}

if(list === 'vip'){
    const role = message.mentions.roles.first() ||  message.guild.roles.cache.get(args[1])
    if(!role){
        const embed  = new EmbedBuilder()
        .setDescription('You have to provide the role !')
        .setColor('#303037')
        return  message.reply({embeds: [embed]})
    }
    if(role.permissions.has("Administrator") === true){
        const embed  = new EmbedBuilder()
        .setDescription('These Role Has Administrator , Try Again Later !')
        .setColor('#303037')
        return  message.reply({embeds: [embed]})
    }
await client.db.set(`vip_${message.guild.id}`,role.id)
const embed  = new EmbedBuilder()
.setDescription(`Successfully added ${role} as Vip Role.`)
.setColor('#303037')
message.channel.send({embeds: [embed]})
}

//
if(list === 'girl'){
    const role = message.mentions.roles.first() ||  message.guild.roles.cache.get(args[1])
    if(!role){
        const embed  = new EmbedBuilder()
        .setDescription('You have to provide the role !')
        .setColor('#303037')
        return  message.reply({embeds: [embed]})
    }

    if(role.permissions.has("Administrator") === true){
        const embed  = new EmbedBuilder()
        .setDescription('These Role Has Administrator , Try Again Later !')
        .setColor('#303037')
        return  message.reply({embeds: [embed]})
    }

await client.db.set(`girl_${message.guild.id}`,role.id)
const embed  = new EmbedBuilder()
.setDescription(`Successfully added ${role} as Girl Role.`)
.setColor('#303037')
message.channel.send({embeds: [embed]})
}

//

if(list === 'config'){
    
    let req = await client.db.get(`reqrole_${message.guild.id}`) || "na"
    let official = await client.db.get(`official_${message.guild.id}`)  || "na"
    let frd = await client.db.get(`friend_${message.guild.id}`) || "na"
    let guest = await client.db.get(`guest_${message.guild.id}`) || "na"
    let girl = await client.db.get(`girl_${message.guild.id}`) || "na"
    let vip = await client.db.get(`vip_${message.guild.id}`) || "na"

   
if(req === 'na'){
    req = 'No role has been Configured'
} else {
    req = `<@${req}>`

}
if(official === 'na'){
    official = 'No role has been Configured'
} else {
    official = `<@${official}>`

}
if(frd === 'na'){
    frd = 'No role has been Configured'
} else {
    frd = `<@${frd}>`

}
if(guest === 'na'){
    guest = 'No role has been Configured'
} else {
    guest = `<@${guest}>`

}
if(vip === 'na'){
    vip = 'No role has been Configured'
} else {
    vip = `<@${vip}>`

}
if(girl === 'na'){
    girl = 'No role has been Configured'
} else {
    girl = `<@${girl}>`

}
    const embed = new EmbedBuilder()
        .setColor('#303037')
        .setTitle('Custom Role List')
        .addFields(
            { name: 'Required Role', value: `${req}`, inline: true },
            { name: 'Official Role', value: `${official}`, inline: true },
            { name: 'Friend Role', value: `${frd}`, inline: true },
            { name: 'Guest Role', value: `${guest}`, inline: true },
            { name: 'Vip Role', value: `${vip}`, inline: true },
            { name: 'Girl Role', value: `${girl}`, inline: true },

        )
    
       message.channel.send({embeds: [embed]})

    
}

if(list === 'reset'){
    await client.db.delete(`reqrole_${message.guild.id}`) 
   await client.db.delete(`official_${message.guild.id}`)  
    await client.db.delete(`friend_${message.guild.id}`) 
     await client.db.delete(`guest_${message.guild.id}`) 
   await client.db.delete(`girl_${message.guild.id}`)
    await client.db.delete(`vip_${message.guild.id}`) 

    const embed = new EmbedBuilder()
    .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
    .setDescription("All custom role has been removed")
    message.channel.send({embeds: [embed]})
    }
      }}