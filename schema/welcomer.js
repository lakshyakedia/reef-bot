const {
  model,
  Schema
} = require('mongoose');


module.exports = model('welcomer', new Schema({
  guild: String,
  enabled: String,
  channel: String,
  message: {
    type:String,
    default: "\`<user.name>\` welcome to \`<guild.name>\`.\nTotal Members: \`<guild.mc>\`"
  }

}));