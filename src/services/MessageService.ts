import { MessageDTO } from '../types/DTO'
import { MessageModel, DialogModel } from '../models'
import { ApiError } from '../exeptions/apiError'

class Service {
    async createMessage(data: MessageDTO) {
        const message = await MessageModel.create(data)

        const updatedDialog = await DialogModel.findByIdAndUpdate(
            data.dialogId,
            {
                lastMessage: message._id,
            },
            { new: true }
        )

        if (!updatedDialog) {
            throw ApiError.BadRequest(
                'Внутренняя ошибка. Диалог не найден, лиюо не существует'
            )
        }

        return message
    }

    async getMessages(dialogId: string) {
        const filter = { dialogId }

        const messages = await MessageModel.find(filter)

        return messages
    }

    async deleteMessages(messageId: string) {
        const deletedMessage = await MessageModel.findByIdAndRemove(messageId)

        if (!deletedMessage) {
            throw ApiError.NotFound()
        }

        return deletedMessage
    }
}

export const MessageService = new Service()
