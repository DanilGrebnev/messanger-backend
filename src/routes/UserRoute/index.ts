import { Router } from 'express'
import { UserController as Controller } from '../../controller'

export const UserRoute = Router()

const UserController = new Controller()

UserRoute.get('/allusers', UserController.getAll)

UserRoute.get('/:id', UserController.getOne)

UserRoute.post('/registration', UserController.create)

UserRoute.delete('/:id', UserController.delete)
