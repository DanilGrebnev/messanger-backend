import { Router } from 'express'
import { UserController as Controller } from '../../controllers'

export const UserRoute = Router()

const UserController = new Controller()

//Получение всех пользователей
UserRoute.get('/all_users', UserController.getAll)

//Получение пользователя по id
UserRoute.get('/:userId', UserController.getOne)

// Активация аккаунта
UserRoute.get('/activate/:link', UserController.activateAccount)

//Получение refresh токена
// UserRoute.get('/refresh', UserController.getRefreshToken)

//Регистрация пользователя
UserRoute.post('/registration', UserController.registration)

//Авторизация
UserRoute.post('/login', UserController.login)

//Аутентификация
// UserRoute.post('/authorization', UserController.authorization)

//Изменение пользователя по id
UserRoute.put('/:userId', UserController.updateOne)

//Удаление пользователя
UserRoute.delete('/:userId', UserController.delete)
