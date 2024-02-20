const User = require("../Models/User");
const Discord = require("discord.js");
const { ActivityType } = require("discord.js");
module.exports.run = async (client) => {

  
client.db.on("ready", () => {     client.logger.log("DB READY");
});
    client.db.on("err", err => {
        
    })

await client.db.connect();

  client.logger.log(`${client.user.username} is ready with ${client.guilds.cache.size} server`);
   
               
   

 
    setInterval(() => {
      const statuses = [
        `discord.gg/reefbot`,`discord.gg/reefbot`,`discord.gg/reefbot`
      ];
      const status = client.config.statuses[Math.floor(Math.random() * statuses.length)];
      client.user.setActivity(status, { type: ActivityType.Listening });
    }, 60000);
    
}
