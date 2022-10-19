import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    favoritesHotels:[{type:mongoose.Schema.Types.ObjectId,ref:'Hotel'}]
})

export default new mongoose.model('User', UserModel)