const { EmbedBuilder,  ButtonBuilder, ActionRowBuilder, Permissions, AttachmentBuilder } = require('discord.js')
const QRCode = require('qrcode');
    module.exports = {
    name: "qrcreate",
    category: 'utility',
    aliases: [ "qrcreate" ],
    cooldown:5,
    description: "creates a qrcode",
    args: false,
    usage: "qrcreate",
   
    
    botPerms: ['ViewChannel','EmbedLinks','UseExternalEmojis'],
userPerms: ['ViewChannel'],
   
    run: async (client, message, args) => {
        const text= args.join(" ");
        if(!text)
        {
            const embed = new EmbedBuilder()
            .setDescription(`<:11:1052589045374533653> Please Enter Some Text`)
            .setColor(client.config.embedColor)
            return message.reply({embeds:[embed]})
        }
        let image = await QRCode.toBuffer(text);
        const attachment = new AttachmentBuilder(image, 'qrcode.png')
        const embed = new EmbedBuilder()
        .setAuthor({name:'Qr Code Generation',iconURL: client.user.displayAvatarURL()})
        .setColor(client.config.embedColor)
        .setImage(`attachment://qrcode.png`)
        message.reply({
            embeds: [embed],
         files: [{
              attachment: image,
              name: `qrcode.png`
            }]})
        }
        }
