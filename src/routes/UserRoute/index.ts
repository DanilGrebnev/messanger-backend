import { Router } from 'express'
import { UserController as Controller } from '../../controller'

export const UserRoute = Router()

const UserController = new Controller()

/**
 * Получение всех пользователей
 */
UserRoute.get('/all_users', UserController.getAll)
/**
 * Получение пользователя по id
 */
UserRoute.get(':id', UserController.getOne)
/**
 * Создание пользователя
 */
UserRoute.post('/registration', UserController.create)
/**
 * Изменение пользователя по id
 */
UserRoute.put('/:id', UserController.updateOne)
/**
 * Удаление пользователя
 */
UserRoute.delete(':id', UserController.delete)
