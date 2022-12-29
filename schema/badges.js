const {
  model,
  Schema
} = require('mongoose');


module.exports = model('badges', new Schema({
  userId: String,
  owner: Boolean,
  developer: Boolean,
  staff: Boolean,
  bughunter:Boolean,
  supporter:Boolean,
  friend:Boolean
}));