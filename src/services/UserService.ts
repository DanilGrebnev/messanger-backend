import { UserModel } from '../models'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { MailService } from './MailService'
import { TokenService } from './TokenService'
import { UserDTO } from '../types/DTO'
import { ApiError } from '../exeptions/apiError'

const returnUserDTO = (user: any) => {
    return {
        email: user.email,
        id: user._id,
        isActivated: user.isActivated,
    }
}

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

        const tokens = TokenService.generateTokens(returnUserDTO(user))

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
    /**
     * Сервис авторизации
     * возвращает пользователя и токены
     */
    async login({ email, password }: { email: string; password: string }) {
        const user = await UserModel.findOne({ email })
        const errorString = 'Неправильный логин или пароль'
        if (!user) {
            throw ApiError.BadRequest(errorString)
        }

        const isPassEquals = await bcrypt.compare(password, user.password)

        if (!isPassEquals) {
            throw ApiError.BadRequest(errorString)
        }

        const userDto = returnUserDTO(user)
        const tokens = TokenService.generateTokens(userDto)

        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, user: userDto }
    }
    /**
     * Удаление токена с базы данных
     */
    async logout(refreshToken: string) {
        const token = await TokenService.removeToken(refreshToken)

        return token
    }
}

export const UserService = new Service()
