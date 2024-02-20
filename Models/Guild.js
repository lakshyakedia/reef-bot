const mongoose = require("mongoose");
const config = require("../config.json");
const Guild = mongoose.Schema({
    guildID: { type: String, required: true, unique: true },
    prefix: { type: String, default: config.prefix },
    banned: { type: Array, default: [] },
})

module.exports = mongoose.model("guild", Guild);
