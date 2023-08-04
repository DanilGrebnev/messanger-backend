import { TController } from '../../types'

import { MessageModel } from '../../models/MessageModel'
import { MessageDTO } from '../../types/DTO/MessageDTO'

export class MessageController {
    sendMessage: TController = async (req, res) => {
        try {
            const data: MessageDTO = req.body

            const response = await MessageModel.create(data)

            res.send(response)
        } catch (error) {
            res.send(error)
        }
    }

    getMessages: TController = async (req, res) => {
        try {
            const messages = await MessageModel.find(req.body.dialog)
            const header = { 'messages-count': messages.length }

            res.set(header)

            res.send(messages)
        } catch (error) {
            res.send(error)
        }
    }

    deleteMessage: TController = async (req, res) => {
        try {
            const response = await MessageModel.findByIdAndRemove(
                req.body.messageId
            )

            res.send(response)
        } catch (err) {
            res.send(err)
        }
    }
}
