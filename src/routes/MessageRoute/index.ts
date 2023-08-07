import { Router } from 'express'
import { MessageController as Controller } from '../../controllers'

export const MessageRoute = Router()

const MessageController = new Controller()

/**
 * Поиск сообщений по id диалога
 */
MessageRoute.get('/:dialogId', MessageController.getMessages)

MessageRoute.post('/', MessageController.createMessage)

MessageRoute.delete('/', MessageController.deleteMessage)
