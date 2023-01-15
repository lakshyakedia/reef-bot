const mongoose = require('mongoose');
const economyschema = mongoose.Schema({
    userId: {
    type:String,
    required:true
    },
    amount: { type: Number,
    default:0
    }
    })
    module.exports = mongoose.model('Economy', economyschema)