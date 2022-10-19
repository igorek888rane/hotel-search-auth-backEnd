import HotelModel from "../models/hotel.js";
import UserModel from "../models/user.js";

export const addHotel = async (req, res) => {
    try {
        const doc = new HotelModel({
            userId:req.userId,
            ...req.body,
        })
        const hotel = await doc.save()
        await UserModel.findByIdAndUpdate({_id:req.userId},{
            $push:{favoritesHotels:hotel}
        })
        res.json({
            message: 'success',
            hotel
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Не удалось добавить',
        });
    }
}


export const deleteHotel = async (req, res) => {
    try {
        const hotel = HotelModel.findByIdAndDelete(req.params.id)
        await UserModel.findByIdAndUpdate({_id:req.userId},{
            $pull:{favoritesHotels:hotel}
        })
        res.json({
            message: 'success',
            hotel
        })
    } catch (e) {
        res.status(500).json({message: 'Не удалось удалить'})
    }
}
