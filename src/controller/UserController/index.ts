import { UserModel } from '../../schemas'
import { TController } from '../../types'

export class UserController {
    getAll: TController = (req, res) => {
        UserModel.find()
            .then(response => res.send(response))
            .catch(error => res.send(error))
    }

    getOne: TController = (req, res) => {
        UserModel.findById({ _id: req.params.id })
            .then(response => res.send(response))
            .catch(error => res.status(404).send(error))
    }

    create: TController = (req, res) => {
        const user = new UserModel({ ...req.body })

        user.save()
            .then(data => res.send(data))
            .catch(err => res.send(err))
    }

    delete: TController = (req, res) => {
        UserModel.findByIdAndDelete({ _id: req.params.id })
            .then(response => res.send(response))
            .catch(error => res.send(error))
    }
}
