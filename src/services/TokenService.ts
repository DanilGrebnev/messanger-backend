import jwt, { Secret } from 'jsonwebtoken'
import { TokenModel } from '../models'

class Service {
    generateTokens(payload: any) {
        const accessToken = jwt.sign(
            payload,
            process.env.JWT_ACCESS_SECRET as Secret,
            { expiresIn: '30m' }
        )

        const refreshToken = jwt.sign(
            payload,
            process.env.JWT_REFRESH_SECRET as Secret,
            { expiresIn: '15d' }
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
}

export const TokenService = new Service()
