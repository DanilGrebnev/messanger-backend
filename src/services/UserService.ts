import { TokenModel, UserModel } from '../models'
import { v4 as uuidv4 } from 'uuid'
import { MailService } from './MailService'
import { TokenService } from './TokenService'
import { UserDTO } from '../types/DTO'
import { ApiError } from '../exeptions/apiError'

import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

const returnUserDTO = (user: UserDTO) => {
    return {
        email: user.email,
        _id: user._id,
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

        const userDTO = returnUserDTO(user)
        const tokens = TokenService.generateTokens(userDTO)

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

    async getAllUsers() {
        const allUsers = await UserModel.find()

        return allUsers
    }

    async findUser(userId: string) {
        const user = await UserModel.findById(userId)

        if (!user) {
            throw ApiError.BadRequest('Данного пользователя не существует')
        }

        return user
    }

    async updateOneUser(_id: string, payload: any) {
        const updatedUser = await UserModel.findByIdAndUpdate(_id, payload, {
            new: true,
        })

        if (!updatedUser) {
            throw ApiError.BadRequest('Пользователя не существует')
        }

        return updatedUser
    }

    /**
     * Сервис авторизации
     * возвращает пользователя и токены
     */
    async login({ email, password }: ILoginProps) {
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

        await TokenService.saveToken(userDto._id, tokens.refreshToken)

        return { ...tokens, user: userDto }
    }

    /**
     * Удаление токена с базы данных
     */
    async logout(refreshToken: string) {
        const token = await TokenService.removeToken(refreshToken)

        return token
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.UnathorizedError()
        }

        const userData = TokenService.validateRefreshToken(
            refreshToken
        ) as UserDTO

        const tokenFromBD = await TokenService.findToken(refreshToken)

        if (!userData || !tokenFromBD) {
            throw ApiError.UnathorizedError()
        }

        const user = await UserModel.findById(userData._id)

        const userDto = returnUserDTO(user as UserDTO)

        const tokens = TokenService.generateTokens(userDto)

        await TokenService.saveToken(userDto?._id, tokens.refreshToken)

        return { ...tokens, user: userDto }
    }
}

export const UserService = new Service()

interface ILoginProps {
    email: string
    password: string
}
