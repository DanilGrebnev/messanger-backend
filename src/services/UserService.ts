import { UserModel } from '../models'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { MailService } from './MailService'
import { TokenService } from './TokenService'
import { UserDTO } from '../types/DTO'
import { ApiError } from '../exeptions/apiError'

export class Service {
    async registration({ email, password, fullName }: UserDTO) {
        const candidate = await UserModel.findOne({ email })

        if (candidate) {
            throw ApiError.BadRequest(
                'Пользователь с таким Email уже существуует'
            )
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuidv4()

        const user = await UserModel.create({
            email,
            password: hashPassword,
            fullName,
            activationLink,
        })

        const link = `${process.env.API_URL}/user/activate/${activationLink}`

        await MailService.sendActivationMail(email, link)

        const tokens = TokenService.generateTokens({
            email: user.email,
            id: user._id,
            isActivated: user.isActivated,
        })

        await TokenService.saveToken(user._id, tokens.refreshToken)

        return {
            user,
            ...tokens,
        }
    }

    async activate(link: string) {
        const user = await UserModel.findOne({ activationLink: link })

        if (!user) {
            throw ApiError.BadRequest('Некорректная ссылка для активации')
        }

        user.isActivated = true

        await user.save()
    }

    async findUser(userId: string) {
        const user = await UserModel.findById(userId)

        if (!user) {
            throw ApiError.BadRequest('Данного пользователя не существует')
        }

        return user
    }
}

export const UserService = new Service()
