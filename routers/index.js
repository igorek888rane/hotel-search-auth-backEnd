import {Router} from "express";
import {registration, login, getMe, getUsers} from "../controllers/userController.js";
import checkAuth from "../utils/checkAuth.js";


export const routerAuth = new Router()

routerAuth.post('/register', registration)
routerAuth.post('/login', login)
routerAuth.get('/me', checkAuth, getMe)
routerAuth.get('/users', getUsers)