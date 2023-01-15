const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "groupgamble",
    description: "Gamble with multiple users",
  category:'economy',
  cooldown: 5,
  userPerms: ["grpgamble", "grpbet", "groupbet"],
   
    run: async (client, message, args, prefix) => {

        let amount = interaction.options.getInteger('amount')
        if (amount < 0) return interaction.followUp(`Provide valid amount to start **group** gamble !`)
        let button = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel("JOIN")
                    .setStyle("SUCCESS")
                    .setCustomId("accept"))
        let buttonx = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel("JOIN")
                    .setStyle("SUCCESS")
                    .setCustomId("disabledAccept")
                    .setDisabled()
            )
        let participants = ` `
        let txt = `Click the button to join group gamble ! ( 30s to join. )\n**Amount**: \`${amount}\` Credits\n\`\`\`Participants:\n${participants}\n\`\`\``
        let msg = await interaction.followUp({ content: `${txt}`, components: [button] })

        const filter = async (inter) => {
            let userx = await User.findOne({ id: inter.user.id })
            if (userx && userx.balance >= amount) return true
            else if (!userx) {
                await inter.deferUpdate()
                inter.followUp({
                    content: `<@${inter.user.id}> , you need to pick a starter pokémon using the \`${prefix}start\` command before using this command !`,
                    ephemeral: true
                })
                return false
            } else if (userx.balance < amount) {
                await inter.deferUpdate()
                inter.followUp({
                    content: `<@${inter.user.id}> , you don't have enough balance to join group gamble !`,
                    ephemeral: true
                })
                return false
            }
        }
        const collector = await msg.createMessageComponentCollector({
            filter, time: 30000
        })
        let allPlayers = [], random
        collector.on('collect', async i => {
            await i.deferUpdate()
            if (i.customId === 'accept' && !allPlayers.includes(i.user.id)) {
                participants += `\n${i.user.tag}`
                txt = `Click the button to join group gamble ! ( 30s to join. )\n**Amount**: \`${amount.toLocaleString()}\` Credits\n\`\`\`\nParticipants:${participants}\n\`\`\``
                msg.edit({ content: `${txt}` })
                allPlayers.push(i.user.id)
            } else {
                return i.followUp({
                    content: `<@${interaction.user.id}> , you have already joined the group gamble !`,
                    ephemeral: true
                })
            }
        })
        collector.on('end', async () => {
            interaction.editReply({ components: [buttonx] })
            if (allPlayers.length <= 2) return interaction.channel.send({ content: `Group gamble cancelled due to insufficient participants !` })
            random = ~~(Math.random() * allPlayers.length)
            for (let i = 0; i < allPlayers.length; i++) {
                let userx = await User.findOne({ id: allPlayers[i] })
                if (allPlayers[random] == allPlayers[i]) userx.balance += amount
                else userx.balance -= amount
                await userx.save()
            }
            return interaction.channel.send(`<@${allPlayers[random]}> won \`${amount.toLocaleString()}\` credits !`)
        })
        
     

    }
}