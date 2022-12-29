const {
  model,
  Schema
} = require('mongoose');


module.exports = model('mass-mention', new Schema({
  guild: String,
  enabled: String,
  
}));