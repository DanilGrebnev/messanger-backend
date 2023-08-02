import { Request, Response } from 'express'

export type TController = (req: Request, res: Response) => void