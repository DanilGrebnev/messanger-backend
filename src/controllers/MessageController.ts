import { TController } from '../types'

import { MessageModel } from '../models'
import { MessageDTO } from '../types/DTO'

export class MessageController {
    createMessage: TController = async (req, res) => {
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
            const filter = { dialogId: req.params.dialogId }

            const messages = await MessageModel.find(filter)

            const header = { 'messages-count': messages.length }

            res.set(header).send(messages)
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
