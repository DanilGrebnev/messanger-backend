import { Router } from 'express'
import { UserController as Controller } from '../../controller'

export const UserRoute = Router()

const UserController = new Controller()

UserRoute.get('/all_users', UserController.getAll)

UserRoute.get(':id', UserController.getOne)

UserRoute.post('/registration', UserController.create)

UserRoute.put('/update_one/:id', UserController.updateOne)

UserRoute.delete(':id', UserController.delete)
