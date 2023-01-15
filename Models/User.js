const mongoose = require('mongoose')
const User = mongoose.Schema({
    userId: { type: String, unique: true},
    blacklisted: { type: Boolean, default: false },
    count: { type: Number, default: 0 },
    wallet: { type: Number, default: 0 },
    bank: { type: Number, default: 0 },
    space: { type: Number, default: 0 },
    daily: {
        dailyTime: { type: Number, default: 0 },
        dailyStreak: { type: Number, default: 0 }
    },
    vote: {
        votedAt: { type: Number, default: 0 },
        totalVotes: { type: Number, default: 0 }
    },
    crates: {
        bronzecrate: { type: Number, default: 0 },
        silvercrate: { type: Number, default: 0 },
        goldencrate: { type: Number, default: 0 },
        diamondcrate: { type: Number, default: 0 },
        deluxecrate: { type: Number, default: 0 }
    },
    songplayed: { type: Number, default: 0 },
    badge: {
        dev: { type: Boolean, default: false },
        mod:{ type: Boolean, default: false },
        owner: { type: Boolean, default: false },
        supporter: { type: Boolean, default: false },
        bug: { type: Boolean, default: false },
        premium: { type: Boolean, default: false },
        user: { type: Boolean, default: true },
        staff: { type: Boolean, default: false },
        
        
    }

})

module.exports = mongoose.model("user", User)