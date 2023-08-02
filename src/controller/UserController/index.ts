import { UserModel } from '../../schemas'
import { TController } from '../../types'
import { UserDTO } from '../../schemas/User/UserDTO'

export class UserController {
    /**
     * Получение всех пользователей
     */
    getAll: TController = async (req, res) => {
        UserModel.find()
            // .limit(2)
            .exec()
            .then(response => res.send(response))
            .catch(error => res.send(error))
    }
    /**
     * Получение одного пользователя
     */
    getOne: TController = (req, res) => {
        UserModel.findById({ _id: req.params.id })
            .then(response => res.send(response))
            .catch(error => res.status(404).send(error))
    }
    /**
     * Создание пользователя
     */
    create: TController = (req, res) => {
        const data: UserDTO = req.body
        const user = new UserModel({ ...data })

        user.save()
            .then(data => res.send(data))
            .catch(err => res.send(err))
    }
    /**
     * Обновление одного пользователя по _id
     */
    updateOne: TController = (req, res) => {
        const filter = { _id: req.params.id }
        const data = req.body

        UserModel.findOneAndUpdate(filter, data, { new: true })
            .then(response => res.send(response))
            .catch(err => res.send(err))
    }
    /**
     * Удаление пользователя
     */
    delete: TController = (req, res) => {
        UserModel.findByIdAndDelete({ _id: req.params.id })
            .then(response => res.send(response))
            .catch(error => res.send(error))
    }
}
