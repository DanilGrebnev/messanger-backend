import Express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import { AppConnect, MiddlewareCombine, RouteCombine } from './libs'
import { routers } from './routes'
import { errorMiddleware } from './middlewares'

dotenv.config()

const app = Express()

MiddlewareCombine(app, [
    json(),
    cookieParser(),
    urlencoded({ extended: false }),
    cors(),
])

RouteCombine(app, routers)

//Middleware обработки ошибок всегда должен идти последним
app.use(errorMiddleware)

AppConnect(app)
