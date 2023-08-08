import { UserModel } from '../models'
import { TController } from '../types'
import { UserService } from '../services'
import dotenv from 'dotenv'

dotenv.config()

const time15d = 15 * 24 * 60 * 60 * 1000

export class UserController {
    //Получение всех пользователей
    getAllUsers: TController = async (req, res, next) => {
        try {
            const allUsers = await UserService.getAllUsers()

            res.json(allUsers)
        } catch (err) {
            next(err)
        }
    }

    //Получение одного пользователя
    getOne: TController = async (req, res, next) => {
        try {
            const user = await UserService.findUser(req.params.userId)

            res.send(user)
        } catch (err) {
            next(err)
        }
    }

    //Активация аккаунта
    activateAccount: TController = async (req, res) => {
        try {
            await UserService.activate(req.params.link)

            res.redirect(process.env.CLIENT_URL as string)
        } catch (error) {
            console.log(error)
            res.status(400).send('<h1>ошибка активации</h1>')
        }
    }

    //Создание пользователя
    registration: TController = async (req, res, next) => {
        try {
            const userData = await UserService.registration(req.body)

            res.cookie('refreshToken', userData?.refreshToken, {
                maxAge: time15d,
                httpOnly: true,
                // secure:true - когда будем использовать https протокол
            })

            return res.json(userData)
        } catch (err) {
            next(err)
        }
    }

    //Авторизация пользователя
    login: TController = async (req, res, next) => {
        try {
            const userData = await UserService.login(req.body)

            res.cookie('refreshToken', userData?.refreshToken, {
                maxAge: time15d,
                httpOnly: true,
                // secure:true - когда будем использовать https протокол
            })

            res.send(userData)
        } catch (err) {
            next(err)
        }
    }

    //Выход из ккаунта
    logout: TController = async (req, res, next) => {
        try {
            const { refreshToken } = req.cookies
            const token = await UserService.logout(refreshToken)

            res.clearCookie('refreshToken')

            res.send(token)
        } catch (err) {
            next(err)
        }
    }

    //Обновление пользователя по _id
    updateOneUser: TController = async (req, res, next) => {
        try {
            const updatedUser = await UserService.updateOneUser(
                req.params.userId,
                req.body
            )

            res.json(updatedUser)
        } catch (err) {
            next(err)
        }
    }

    refresh: TController = async (req, res, next) => {
        try {
            const { refreshToken } = req.cookies

            const userData = await UserService.refresh(refreshToken)

            res.cookie('refreshToken', userData?.refreshToken, {
                maxAge: time15d,
                httpOnly: true,
                // secure:true - когда будем использовать https протокол
            })

            res.json(userData)
        } catch (err) {
            next(err)
        }
    }

    //Удаление пользователя
    delete: TController = (req, res) => {
        UserModel.findByIdAndDelete({ _id: req.params.userId })
            .then(response => res.send(response))
            .catch(error => res.send(error))
    }
}
