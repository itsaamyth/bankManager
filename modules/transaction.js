const mongoose = require('mongoose')
const transactionSchema = new mongoose.Schema({
    accountName:{
        type:String,
        required:true
    },
    accountNumber:{
        type:Number,
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