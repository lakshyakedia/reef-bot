const {
  model,
  Schema
} = require('mongoose');


module.exports = model('anti-link', new Schema({
  guild: String,
  enabled: String
}));