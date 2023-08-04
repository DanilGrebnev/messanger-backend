import Express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { AppConnect, MiddlewareCombine, RouteCombine } from './lib'
import { routers } from './routes'

dotenv.config()

const app = Express()

MiddlewareCombine(app, json(), cors())

RouteCombine(app, routers)

AppConnect(app)
