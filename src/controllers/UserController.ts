import { UserModel } from '../models'
import { TController } from '../types'
import { UserService } from '../services'
import dotenv from 'dotenv'

dotenv.config()

const time15d = 15 * 24 * 60 * 60 * 1000

export class UserController {
    //Получение всех пользователей
    getAll: TController = (req, res) => {
        UserModel.find()
            .then(response => res.send(response))
            .catch(error => res.send(error))
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

    //Обновление одного пользователя по _id
    updateOne: TController = (req, res) => {
        const filter = { _id: req.params.userId }
        const data = req.body

        UserModel.findOneAndUpdate(filter, data, { new: true })
            .then(response => res.send(response))
            .catch(err => res.send(err))
    }

    //Удаление пользователя
    delete: TController = (req, res) => {
        UserModel.findByIdAndDelete({ _id: req.params.userId })
            .then(response => res.send(response))
            .catch(error => res.send(error))
    }
}
