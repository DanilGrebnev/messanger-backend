import { Router } from 'express'
import { Request, Response } from 'express'

export type TController = (req: Request, res: Response) => void

export type TRouters = [string, Router][]
