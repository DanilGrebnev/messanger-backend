import { Router } from 'express'
import { DialogController } from '../../controllers'

export const DialogRoute = Router()

const Controller = new DialogController()

DialogRoute.get('/:userId', Controller.getDialog)

DialogRoute.post('/', Controller.createDialog)
