const { EmbedBuilder, version, ActionRowBuilder, ButtonBuilder, Message } = require("discord.js");
const Topgg = require("@top-gg/sdk");
const topgg = new Topgg.Api("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkwMjg0MjY3NjAyNDYwNjc0MSIsImJvdCI6dHJ1ZSwiaWF0IjoxNjY5Mzg0MzA5fQ.ATEr19kaKpLH5gjFmaQnngAj9qj9cOT54lWpSNYtW9w");


module.exports = {
    name: "profile",
    category: "utility",
    description: "Show the user's profile",
    args: false,
    aliases: ["badge", "badges", "achievement", "achievements"],
    usage: "",
    permission: [],
    caching: true,
    owner: false,
    run : async (client,message,args) => {
      let user = message.mentions.users.first()|| message.mentions.users.first(2)[1] || client.users.cache.get(args[0]) || message.author;
      if(user.id === client.user.id){
         user = message.author;
      }
      let voted = await client.topgg.hasVoted(user.id);
   
      let badges = "";
      let uprem = await client.db.get(`uprem_${user.id}`)
  let upremend = await client.db.get(`upremend_${user.id}`)
  let count = await client.db.get(`upremcount_${user.id}`)
      const guildd = await client.guilds.fetch("805734218122264606"); 
      const sus = await guildd.members.fetch(user.id).catch((e) => {
      if(uprem || voted ) badges = badges + `\n<a:prime:1028203449977933854> **Premium User**`;
      else badges = "`No Badge Available`";
      });
      if(client.config.owner.includes(user.id)) badges = badges + `\n<:owner:979635607141756978> **Creator**`;
try{
    

	  

        const own = sus.roles.cache.has("920657484585250827");
      if(own === true) badges = badges+`\n<:dev:978563383580295188>  **Developers**`;

      const supp = sus.roles.cache.has("920657485298270209");
      if(supp === true) badges = badges + `\n<:staff:984369673715982378> **Staff**`;

      const mod = sus.roles.cache.has("920657486409768961");
      if(mod === true) badges = badges + `\n<:mod:984369659094654996> **Moderator**`;

	  if(uprem || voted) badges = badges + `\n<a:prime:1028203449977933854> **Premium User**`;

      const bug = sus.roles.cache.has("979644017807597568");
      if(bug === true) badges = badges + `\n<:bug:984369647040204820> **Bug Hunter**`;

      const supo = sus.roles.cache.has("920657496182521856");
      if(supo === true) badges = badges + `\n<:early:978563383479636019> **Supporter**`;

      const frn = sus.roles.cache.has("920657495427538974");
      if(frn === true) badges = badges + `\n<:friends:984372535862919188> **Close Friend**`;

}catch(err){
if(uprem || voted) {
badges = "";
badges = badges + `\n<a:prime:1028203449977933854> **Premium User**`;
}
else if(badges === "") badges = "`No Badge Available`";
}

      /*const row = new ActionRowBuilder()
           .addComponents(new ButtonBuilder()
    .setLabel("Premium")
    .setStyle("Link")
    .setURL(`https://top.gg/bot/${client.user.id}/vote`)
			);*/
      const embed = new EmbedBuilder()
      .setAuthor({name:`Profile For ${user.username}#${user.discriminator}`,iconURL: client.user.displayAvatarURL({dynamic: true}), url:client.config.links.dc})
      .setThumbnail(user.displayAvatarURL({dynamic: true}))
      .setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor)
      .addFields({name:`*__Achievements__*`,value: `${badges ? badges : "`No Badge Available`"}`})
     /** if(!voted && !uprem)
        embed.addFields({name:`*__Premium__ <a:prime:1028203449977933854>*`, value: `You don't have any type of premium! Click [here](client.config.links.dc) to buy [premium](client.config.links.dc) or Click [here](https://top.gg/bot/855476492146573332/vote) to vote and get access to [premium](https://top.gg/bot/855476492146573332/vote).`})
      else if(voted || uprem)
        embed.addFields({name:`*__Premium__ <a:prime:1028203449977933854>*`,value: !uprem ? `You have voted, so you have access to premium features untill next vote is available` : `Premium Count: \`${count ? count : 0}\`\nPremium Ends: <t:${Math.round(upremend / 1000)}> (<t:${Math.round(upremend / 1000)}:R>)`})
, components: [row]
*/
        .setTimestamp();
      message.channel.send({embeds: [embed]})
    }
}