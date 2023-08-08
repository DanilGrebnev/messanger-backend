import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../exeptions/apiError'
import { TokenService } from '../services'
import { UserDTO } from '../types/DTO/UserDTO'

export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization

        if (!authorizationHeader) {
            return next(ApiError.UnathorizedError())
        }

        const accessToken = authorizationHeader.split(' ')[1]

        if (!accessToken) {
            return next(ApiError.UnathorizedError())
        }

        const userData = TokenService.validateAccessToken(accessToken)

        if (!userData) {
            return next(ApiError.UnathorizedError())
        }

        req.user = userData

        next()
    } catch (err) {
        return next(ApiError.UnathorizedError())
    }
}
