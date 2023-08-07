import { TController } from '../types'
import { DialogModel } from '../models'
import { DialogDTO } from '../types/DTO'

export class DialogController {
    createDialog: TController = (req, res) => {
        const { receiverId, senderId }: DialogDTO = req.body

        DialogModel.create({ members: [receiverId, senderId] })
            .then(response => res.send(response))
            .catch(err => res.send(err))
    }
    /**
     * Поиск дилогов в которых участвует пользователь
     */
    getDialog: TController = async (req, res) => {
        const filter = { members: { $in: [req.params.id] } }

        DialogModel.find(filter)
            .then(data => res.send(data))
            .catch(err => res.send(err))
    }
}
