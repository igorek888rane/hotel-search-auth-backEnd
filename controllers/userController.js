import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {userDto} from "../utils/userDto.js";

export const registration = async (req, res) => {
    try {
        const {email} = req.body
        const candidate = await UserModel.findOne({email})
        if (candidate) res.status(400).json({message: "Пользователь с такой почтой уже существует"})
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(req.body.password, salt)
        const doc = new UserModel({
            email,
            password,
        })
        const user = await doc.save()
        const token = jwt.sign({
            _id: user._id
        }, process.env.JWT_ACCESS_SECRET, {expiresIn: '30d'})

        const data = userDto(user._doc, token)
        res.json({message: 'success', data})
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
        if (!user) res.status(400).json({message: "Пользователя с такой  почтой не существует"})
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.password)
        if (!isValidPass) res.status(400).json({message: 'Неверный логин или пароль'})
        const token = jwt.sign({
            _id: user._id
        }, process.env.JWT_ACCESS_SECRET, {expiresIn: '30d'})
        const data = userDto(user._doc, token)
        res.json({message: 'success', data})
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Не удалось авторизоваться'})
    }
}