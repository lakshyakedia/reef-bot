const discord = require("discord.js");
const { readdirSync } = require("fs");
const { EmbedBuilder, WebhookClient, GatewayIntentBits } = require('discord.js')
const { Webhooks: { bot_error, webhook_error } } = require('./config.json')


const Client = discord.Client;

const moment = require("moment");


const mongoose = require("mongoose");
require("dotenv").config()

const client = new Client({
  restWsBridgetimeout: 100,
  failIfNotExists: true,
  makeCache: discord.Options.cacheEverything(),
  
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: false,
  },

  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.DirectMessages,    
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,

  ],
  ws: { properties: { browser: "Discord Android" } }
});
const { Database } = require("quickmongo");

client.login('TOKEN').catch(e => console.log(e));
const CurrencySystem = require("currency-system");

client.config = require("./config.json");
const cs = new CurrencySystem();
client.commands = new discord.Collection();
client.config = require('./config.json');
client.noprefix = client.config.noprefix;
client.emoji = require('./util/emoji.json');
client.categories = readdirSync("./commands/");
client.scategories = readdirSync("./SlashCommands/");

client.prefix = client.config.prefix;
client.phone = new discord.Collection();
client.aliases = new discord.Collection();
client.cooldowns = new discord.Collection();
client.slash = new discord.Collection();
CurrencySystem.cs
  .on("debug", (debug, error) => {
    console.log(debug);
    if (error) console.error(error);
  })
  .on("userFetch", (user, functionName) => {
    console.log(
      `( ${functionName} ) Fetched User:  ${
        client.users.cache.get(user.userID).tag
      }`
    );
  })
  .on("userUpdate", (oldData, newData) => {
    console.log("User Updated: " + client.users.cache.get(newData.userID).tag);
  });
cs.setMongoURL(client.config.db);
// Set Default Bank Amount when a new user is created!
cs.setDefaultBankAmount(0);
cs.setDefaultWalletAmount(0);
//  Its bank space limit (can be changed according to per user) here 0 means infinite.
cs.setMaxBankAmount(10000);
// Set Default Maximum Amount of Wallet Currency a user can have! (can be changed according to per user) here 0 means infinite.
cs.setMaxWalletAmount(10000);
// Search for new npm package updates on bot startup! Latest version will be displayed in console.
cs.searchForNewUpdate(true);
const Topgg = require("@top-gg/sdk");
client.topgg = new Topgg.Api("API");

client.userSettings = new discord.Collection();
client.logger = require('./util/logger.js');
client.db = new Database(client.config.db);

const dbOptions = {
  useNewUrlParser: true,
  autoIndex: false,
  useUnifiedTopology: true
}

mongoose.connect(client.config.db, dbOptions)
mongoose.connection.on("connected", () => {
  client.logger.log("mongoose connected")

})
client.on("message", async message => {
  try {
  const hasText = Boolean(message.content);
    const hasImage = message.attachments.size !== 0;
    const hasEmbed = message.embeds.length !== 0;
    if (message.author.bot || (!hasText && !hasImage && !hasEmbed)) return;
    const origin = bot.phone.find(
      call => call.origin.id === message.channel.id
    );
    const recipient = client.phone.find(
      call => call.recipient.id === message.channel.id
    );
    if (!origin && !recipient) return;
    const call = origin || recipient;
    if (!call.active) return;
    await call.send(
      origin ? call.recipient : call.origin,
      message,
      hasText,
      hasImage,
      hasEmbed
    );
  } catch {
    return;
  }
});
const automodF = require(`./automod/automod-execute`);
        client.on('messageCreate', (...args) => automodF.run(client, ...args));
        
client.on('interactionCreate', async interaction => {
  if (interaction.isButton()) {

    if (interaction.customId === 'DELETE_BUT') {
      const em = new EmbedBuilder()
        .setDescription(`Only Bot Owner Can Use This Button`)
        .setColor(`#ff0000`)

      if (client.config.owner.includes(interaction.member.user.id))
        return interaction.message.delete();
      else
        return interaction.reply({ embeds: [em], ephemeral: true });
    }

  }
});
client.on("threadCreate", (thread) => {
  try {
    thread.join();
  } catch (e) {
    console.log(e.message);
  }
});

const { AutoPoster } = require('topgg-autoposter')
const weeb = new WebhookClient({ url:  webhook_error}); 
const poster = AutoPoster('API', client) // your discord.js or eris client

// optional
poster.on('posted', (stats) => { // ran when succesfully posted
 weeb.send({content:`Posted stats to Top.gg | ${stats.serverCount} servers`})
})
const date = `${moment().format("DD-MM-YYYY hh:mm:ss")}`;
const web = new WebhookClient({ url: bot_error });

process.on('unhandledRejection', (error) => {

  web.send({ content: `\`\`\`js\n${error}\`\`\`` });
  console.log(error)
  //console.log(`[${chalk.gray(date)}]: [${chalk.black.bgRed('ERROR')}] ${error}`)
});
//now creating interaction event
["commands", "slash", "events"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});




