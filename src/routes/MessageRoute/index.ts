import { Router } from 'express'
import { MessageController as Controller } from '../../controller'

export const MessageRoute = Router()

const MessageController = new Controller()

/**
 * Поиск сообщений по id диалога
 */
MessageRoute.get('/', MessageController.getMessages)

MessageRoute.post('/', MessageController.sendMessage)

MessageRoute.delete('/', MessageController.deleteMessage)
