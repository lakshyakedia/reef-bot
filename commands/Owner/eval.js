const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, AttachmentBuilder } = require("discord.js");

const { post } = require("node-superfetch");

module.exports = {
  name: "eval",
  description:"evaluates the given code",
  aliases:['ev'],
  owner:true,
  run: async (client, message, args) => {
      function send(MMM, cha){
if(!cha){
   cha = message.channel.id
  }

    let cnel = client.channels.cache.get(cha);
if(!cnel)  {
           return "SendErr: Channel not found.";
 }

  if(!MMM){
 return "SendErr: Message not provided.";
}
  return cnel.send(MMM);
}
      const embed= new EmbedBuilder();
      embed.setColor(message.guild.members.me.displayHexColor !== '#000000' ? message.guild.members.me.displayHexColor : client.config.embedColor);
 const row = new ActionRowBuilder()
           .addComponents(new ButtonBuilder()
    .setEmoji("993492852023762965")
    .setCustomId('DELETE_BUT')
    .setStyle("Danger"));

     

      const em1 = new EmbedBuilder();
      const nembed = new EmbedBuilder()
      .setColor(`${client.config.embedColor}`)
      .setDescription("${client.emoji.wrong} You are not allowed to run this command! Only the Owners are allowed to run this command!")            
      .setFooter({text:message.author.tag})
  
  if (!client.config.owner.includes(message.author.id)) return message.channel.send({
      embeds: [nembed]
  });
        
      

       let a = "";

        try {
            const code = args.join(" ");
            if (!code) return  message.channel.send({content: `\`\`\`js\nundefined\`\`\``, components: [row]});
            let evaled;

            if (code.includes(`SECRET`) || code.includes(`client.token`) || code.includes(`TOKEN`) || code.includes("process.env")) {
                evaled = "No, shut up, what will you do it with the token?";
            } else {
                evaled = await eval(code);
            }

            if (typeof evaled !== "string") evaled = await require("util").inspect(evaled, { depth: 0 });

            let output = clean(evaled);
            if (output.length > 1024) {
               
         const { body } = await post("https://hastebin.com/documents").send(output);
                a += `https://hastebin.com/${body.key}.js`;
              
            } else {
                a += "```js\n" + output + "```";
            }

            message.channel.send({content: `${a}`, components: [row]});

        } catch (error) {
            let err = clean(error);
            if (err.length > 1024) {
               
                const { body } = await post("https://hastebin.com/documents").send(err);
                a += `https://hastebin.com/${body.key}.js`;
            } else {
                a += "```js\n" + err + "```";
            }

             message.channel.send({content: `${a}`, components: [row]});
  
        }
    }
}

function clean(string) {
    if (typeof text === "string") {
        return string.replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
    } else {
        return string;
    }
}