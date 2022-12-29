const { EmbedBuilder, PermissionsBitField } = require(`discord.js`);

module.exports = {
    name : "girl",
    aliases : ["gurl"],
    cooldown: 5,
    category : "customroles",
    run : async(client,message,args) => {
        let prefix = await client.db.get(`prefix_${message.guild.id}`);
        if(!prefix) prefix = client.prefix;
        let reqRole = await client.db.get(`reqrole_${message.guild.id}`);
        if(!reqRole || reqRole == null){
            return message.channel.send({embeds : [new EmbedBuilder().setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor).setDescription(`there is no **required role** for **custom roles**`)]})
        }

        if(!message.member.permissions.has(PermissionsBitField.resolve('Administrator')) && message.author.id != message.guild.ownerId  && !message.member.roles.cache.has(reqRole)){ return message.channel.send({embeds : [new EmbedBuilder().setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor).setDescription(`you are not allowed to run these command.`)]}) }

        if(!args[0]){
            return message.channel.send({embeds : [new EmbedBuilder().setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor).setDescription(`usage : \`${prefix}\`girl \``)]})
        }

        let abc = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!abc) return message.channel.send({content : `Please Provide me a valid user.`});

        let gRole = await client.db.get(`girl_${message.guild.id}`);
        if(!gRole || gRole == null){
            return message.channel.send({embeds : [new EmbedBuilder().setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor).setDescription(`there is no **girl role** set for **custom roles**`)]})
        }

        if(!message.guild.roles.cache.has(gRole)){
            await client.db.set(`girl_${message.guild.id}`,null);
            return message.channel.send({embeds : [new EmbedBuilder().setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor).setDescription(`i couldn't find that role in this guild.probably deleted!`)]})
        }

        message.guild.members.cache.get(abc.id).roles.add(gRole);
        return message.channel.send({embeds : [new EmbedBuilder().setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor).setDescription(`successfully added <@&${gRole}> to ${abc}`)]});
    }
}