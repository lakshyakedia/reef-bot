const {
  model,
  Schema
} = require('mongoose');


module.exports = model('anti-new-line', new Schema({
  guild: String,
  enabled: String
}));