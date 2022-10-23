import HotelModel from "../models/hotel.js";

export const addHotel = async (req, res) => {
    try {
        const doc = new HotelModel({
            userId: req.userId,
            ...req.body,
        })
        const hotel = await doc.save()

        res.json(hotel)
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Не удалось добавить',
        });
    }
}


export const deleteHotel = async (req, res) => {
    try {
        const hotelId = req.params.id
        const hotel = await HotelModel.findOneAndDelete(hotelId)
        res.json(hotel)
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Не удалось удалить'})
    }
}

export const getHotels = async (req, res) => {
    try {
        const hotels = await HotelModel.find({userId: req.userId})
        res.json(hotels)
    } catch (e) {
        res.status(500).json({message: 'Не удалось удалить'})
    }
}

