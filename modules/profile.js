const mongoose =  require('mongoose')
const profileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    accNumber:{
        type:Number,
        required:true
    },
    accBalance:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model("profile",profileSchema);