const {
  EmbedBuilder,
  PermissionsBitField,
  ApplicationCommandOptionType,
  ActionRowBuilder,
  ButtonBuilder,
} = require("discord.js");
const User = require("../../Models/User.js");
module.exports = {
  name: "groupgamble",
  description: "Gamble with multiple users",
  category: "economy",
  aliases: ["groupbet"],
  cooldown: 5,
  userPerms: [""],

  run: async (client, message, args, prefix) => {
    let amount = parseInt(args[0]);
    if (amount < 0)
      return message.channel.send(`You can't gamble less than 0 credits !`);
    if (!amount) return message.channel.send(`Enter an amount to gamble !`);
    if (isNaN(amount))
      return message.channel.send(`That's not a valid number !`);
    if (amount && !isNaN(amount)) {
      let button = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel("Join")
          .setStyle("Success")
          .setCustomId("accept")
      );
      let buttonx = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel("Join")
          .setStyle("Success")
          .setCustomId("disabledAccept")
          .setDisabled(true)
      );
      let participants = ` `;
      let txt = `Click the button to join group gamble ! ( 30s to join. )\n**Amount**: \`${amount}\` Credits\n\`\`\`Participants:\n${participants}\n\`\`\``;
      const msg = await message.channel.send({
        //const msg = message.followUp({
        content: `${txt}`,
        components: [button],
      });

      const filter = async (inter) => {
        let userx =
          (await User.findOne({ userId: inter.user.id })) ||
          new User({ userId: inter.user.id });
        if (userx && userx.wallet >= amount) return true;
        else if (userx.wallet < amount) {
          await inter.reply({
            content: `You don't have enough balance to join group gamble !`,
            ephemeral: true,
          });
          return false;
        }
      };
      const collector = await msg.createMessageComponentCollector({
        filter,
        time: 30000,
      });
      let allPlayers = [];
      collector.on("collect", async (i) => {
        await i.deferUpdate();
        if (i.customId === "accept" && !allPlayers.includes(i.user.id)) {
          participants += `\n${i.user.tag}`;
          txt = `Click the button to join group gamble ! ( 30s to join. )\n**Amount**: \`${amount.toLocaleString()}\` Credits\n\`\`\`\nParticipants:${participants}\n\`\`\``;
          msg.edit({ content: `${txt}` });
          allPlayers.push(i.user.id);
        } else {
          return i.reply({
            content: `You have already joined the group gamble !`,
            ephemeral: true,
          });
        }
      });

      collector.on("end", async () => {
        msg.edit({ components: [buttonx] });
        if (allPlayers.length <= 2)
          return message.channel.send({
            content: `Group gamble cancelled due to insufficient participants !`,
          });
        random = ~~(Math.random() * allPlayers.length);
        for (let i = 0; i < allPlayers.length; i++) {
          let winamount = amount * allPlayers.length;
          let userx = await User.findOne({ userId: allPlayers[i] });
          if (allPlayers[random] == allPlayers[i]) userx.wallet += winamount;
          else userx.wallet -= amount;
          await userx.save();
        }
        let winamount = amount * allPlayers.length;
        return message.channel.send(
          `<@${allPlayers[random]}> won \`${winamount.toLocaleString()}\` credits !`
        );
      });
    }
  },
};
