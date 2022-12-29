const mongoose = require("mongoose");
const config = require("../config.json");
const Guild = mongoose.Schema({
    guildID: { type: String, required: true, unique: true },
    prefix: { type: String, default: config.prefix },
    banned: { type: Array, default: [] },
    _247: { type: Boolean, default: false },
    autoplay: { type: Boolean, default: false },
    announce: { type: Boolean, default: true },
    delannounce: { type: Boolean, default: true },
    requester: { type: Boolean, default: false },
    voiceChannels: { type: Array, default: [] },
  
    manager: {
        channelID: { type: String },
        messageID: { type: String }
    }



})

module.exports = mongoose.model("guild", Guild);