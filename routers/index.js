import {Router} from "express";
import {registration,login} from "../controllers/userController.js";


export const routerAuth = new Router()

routerAuth.post('/registration',registration)
routerAuth.post('/login',login)