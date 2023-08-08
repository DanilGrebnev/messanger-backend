import { Router } from 'express'
import { UserController as Controller } from '../../controllers'
import { authMiddleware } from '../../middlewares/authMiddleware'

export const UserRoute = Router()

const UserController = new Controller()

//Получение всех пользователей
UserRoute.get('/all_users', authMiddleware, UserController.getAllUsers)

//Получение пользователя по id
UserRoute.get('/:userId', UserController.getOne)

//Обновление пользователя по id
UserRoute.put('/:userId', UserController.updateOneUser)

//Активация аккаунта
UserRoute.get('/activate/:link', UserController.activateAccount)

//Регистрация пользователя
UserRoute.post('/registration', UserController.registration)

//Авторизация
UserRoute.post('/login', UserController.login)

//Выход из аккаунта
UserRoute.post('/logout', UserController.logout)

//Обновление access токена
UserRoute.post('/refresh', UserController.refresh)

//Удаление пользователя
UserRoute.delete('/:userId', UserController.delete)
