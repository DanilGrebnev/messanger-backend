import { NextFunction, Router } from 'express'
import { Request, Response } from 'express'

export type TController = (
    req: Request,
    res: Response,
    next?: NextFunction
) => void

export type TRouters = [string, Router][]
