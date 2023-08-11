import { TController } from '../types'
import { MessageDTO } from '../types/DTO'
import { MessageService } from '../services'

export class MessageController {
    createMessage: TController = async (req, res, next) => {
        try {
            const data: MessageDTO = req.body

            const response = await MessageService.createMessage(data)

            res.send(response)
        } catch (err) {
            next(err)
        }
    }

    getMessages: TController = async (req, res, next) => {
        try {
            const messages = await MessageService.getMessages(
                req.params.dialogId
            )

            const header = { 'messages-count': messages.length }

            res.set(header).json(messages)
        } catch (err) {
            next(err)
        }
    }

    deleteMessage: TController = async (req, res, next) => {
        try {
            const response = await MessageService.deleteMessages(
                req.body.messageId
            )

            res.send(response)
        } catch (err) {
            next(err)
        }
    }
}
