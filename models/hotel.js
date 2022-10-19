import mongoose from "mongoose";

const HotelModel = new mongoose.Schema({
    userId: {type: String, unique: true, required: true},
    hotelName: {type: String, required: true},
    dateIn: {type: String, required: true},
    stars:{type:Number,required:true},
    priceAvg:{type:Number,required:true},
    countDay:{type:Number,required:true},
})

export default new mongoose.model('Hotel', HotelModel)