import { TController } from '../../types'
import { DialogModel } from '../../models'

export class DialogController {
    createDialog: TController = (req, res) => {
        DialogModel.create(req.body)
            .then(response => res.send(response))
            .catch(err => res.send(err))
    }

    getDialog: TController = async (req, res) => {
        //фильтр для поиска по id автора среди диалогов
        const filter = { authors: req.params.id }
        /**
         * Находим диалог по id автора и заполняем массив
         * с авторами данными из коллекции Users
         */
        DialogModel.find(filter)
            .populate('authors')
            .then(data => res.send(data))
            .catch(err => res.send(err))
    }
}
