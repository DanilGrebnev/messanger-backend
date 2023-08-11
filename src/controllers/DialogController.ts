import { TController } from '../types'
import { DialogDTO } from '../types/DTO'
import { DialogService } from '../services'

export class DialogController {
    createDialog: TController = async (req, res, next) => {
        try {
            const { members }: DialogDTO = req.body

            const dialog = await DialogService.createDialog(members)

            res.json(dialog)
        } catch (err) {
            next(err)
        }
    }
    /**
     * Поиск дилогов в которых участвует пользователь
     */
    getDialog: TController = async (req, res, next) => {
        try {
            const userId = req.params.userId

            const dialogs = await DialogService.getDialogs(userId)

            res.json(dialogs)
        } catch (err) {
            next(err)
        }
    }
}
