import { DialogModel } from '../models'

class Service {
    async createDialog(members: string[]) {
        const dialog = await DialogModel.create({ members })

        return dialog
    }

    async getDialogs(userId: string) {
        const filter = { members: { $in: [userId] } }

        const dialogs = await DialogModel.find(filter)
            .populate({
                path: 'members',
                select: '-password -__v -activationLink',
            })
            .populate('lastMessage')

        return dialogs
    }
}

export const DialogService = new Service()
