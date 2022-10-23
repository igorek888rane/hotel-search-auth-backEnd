import mongoose from "mongoose";

const HotelModel = new mongoose.Schema({
    userId: {type: String, required: true},
    hotelName: {type: String, required: true},
    priceAvg: {type: Number, required: true},
    hotelId: {type: Number, required: true},
    stars: {type: Number, required: true},
    location: {
        country: {type: String},
        name: {type: String},
        geo: {
            lon: {type: Number},
            lat: {type: Number},
        },
        state: {type: String}
    },
    locationId: {type: Number},
    priceForm: {type: Number},
    pricePercentile: {
        3: {type: Number},
        10: {type: Number},
        35: {type: Number},
        50: {type: Number},
        75: {type: Number},
        99: {type: Number}
    }


})

export default new mongoose.model('Hotel', HotelModel)
