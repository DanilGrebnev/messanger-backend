import jwt, { Secret } from 'jsonwebtoken'
import { TokenModel } from '../models'
import dotenv from 'dotenv'
import { UserDTO } from '../types/DTO'

dotenv.config()

class Service {
    generateTokens(payload: any) {
        const accessToken = jwt.sign(
            payload,
            process.env.JWT_ACCESS_SECRET as string,
            { expiresIn: process.env.JWT_ACCESS_SECRET_LIFETIME }
        )

        const refreshToken = jwt.sign(
            payload,
            process.env.JWT_REFRESH_SECRET as string,
            { expiresIn: process.env.JWT_REFRESH_SECRET_LIFETIME }
        )

        return {
            accessToken,
            refreshToken,
        }
    }

    async saveToken(userId: string, refreshToken: string) {
        const filter = { user: userId }

        const tokenData = await TokenModel.findOne(filter)

        if (tokenData) {
            tokenData.refreshToken = refreshToken
            
            return await tokenData.save()
        }

        const token = await TokenModel.create({ ...filter, refreshToken })

        return token
    }

    async removeToken(refreshToken: string) {
        const tokenData = await TokenModel.deleteOne({ refreshToken })

        return tokenData
    }

    /**
     * Поиск для проверки токена на его наличие в базе данных
     */
    async findToken(refreshToken: string) {
        return await TokenModel.findOne({ refreshToken })
    }

    validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(
                token,
                process.env.JWT_ACCESS_SECRET as string
            )

            return userData
        } catch (err) {
            return null
        }
    }

    validateRefreshToken(token: string) {
        try {
            const userData = jwt.verify(
                token,
                process.env.JWT_REFRESH_SECRET as string
            )

            return userData
        } catch (err) {
            return null
        }
    }
}

export const TokenService = new Service()
