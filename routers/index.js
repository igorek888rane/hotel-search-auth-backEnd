import {Router} from "express";
import {registration, login, getMe, getUsers} from "../controllers/userController.js";
import checkAuth from "../utils/checkAuth.js";
import {addHotel, deleteHotel, getHotels} from "../controllers/hotelsController.js";


export const routerAuth = new Router()

routerAuth.post('/register', registration)
routerAuth.post('/login', login)
routerAuth.get('/me', checkAuth, getMe)
routerAuth.get('/users', getUsers)

export const routerHotels = new Router()

routerHotels.post('/addHotel', checkAuth, addHotel)
routerHotels.delete('/addHotel', checkAuth, deleteHotel)
routerHotels.get('/addHotel', checkAuth, getHotels)