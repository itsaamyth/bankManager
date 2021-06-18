const mongoose = require('mongoose')
const customersSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    accNumber:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model("customers",customersSchema);