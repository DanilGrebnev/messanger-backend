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
}
