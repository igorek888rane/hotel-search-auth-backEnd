import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import {userDto} from "../utils/userDto.js";
import {generateToken} from "../utils/generateToken.js";


export const registration = async (req, res) => {
    try {
        const {email} = req.body
        const candidate = await UserModel.findOne({email})
        if (candidate) {
            return res.status(400).json({message: "Пользователь с такой почтой уже существует"})
        }
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(req.body.password, salt)
        const doc = new UserModel({
            email,
            password,
        })
        const user = await doc.save()

        const token = generateToken(user)
        const data = userDto(user._doc, token)
        return res.json({message: 'success', data})
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Не удалось зарегистрироваться',
        });
    }
}


export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email})
        if (!user) {
            return res.status(400).json({message: "Пользователя с такой  почтой не существует"})
        }
        const isValidPass = await bcrypt.compare(req.body.password, user.password)
        if (!isValidPass) {
            return res.status(400).json({message: 'Неверный логин или пароль'})
        }
        const token = generateToken(user)
        const data = userDto(user._doc, token)
        return res.json({message: 'success', data})
    } catch (e) {
        res.status(500).json({message: 'Не удалось авторизоваться'})
    }
}
export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId)
        return res.json({message: 'success', data: user})
    } catch (e) {
        res.status(500).json({message: 'Ошибка'})
    }
}


export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find()
        return res.json(users)
    } catch (e) {
        res.status(500).json({message: 'Не удалось получить юзеров'})
    }
}