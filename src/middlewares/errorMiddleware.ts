import { ApiError } from '../exeptions/apiError'
import { Request, Response, NextFunction } from 'express'
import { TErrorMiddleware } from '../types'

export const errorMiddleware: TErrorMiddleware = (err, req, res, next) => {
    console.log(err)

    if (err instanceof ApiError) {
        return res.status(err.status).json({
            message: err.message,
            errors: err.errors,
        })
    }

    return res.status(500).json({ message: 'Непредвиденная ошибка' })
}
