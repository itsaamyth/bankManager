const mongoose = require('mongoose')
const transactionSchema = new mongoose.Schema({
    account:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    remarks:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
},{timestamps:true})

module.exports = mongoose.model("transactions",transactionSchema);