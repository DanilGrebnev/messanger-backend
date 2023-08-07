import { NextFunction, Router, Express } from 'express'
import { Request, Response } from 'express'

export type TController = (
    req: Request,
    res: Response,
    next: NextFunction
) => void

export type TMiddlewareCombine = (app: Express, ...args: any[]) => void
export type TRouters = [string, Router][]
export type TErrorMiddleware = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => any
