const mongoose=require('mongoose');
const cardSchema=mongoose.Schema({
    CardType:String,
    CardBank:String,
    HolderName:String,
    CardNumber:Number,
    CardExpiry:String,
    CardCVC:Number
}, { timestamps : true });
module.exports = mongoose.model('Card',cardSchema);