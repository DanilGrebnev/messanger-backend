import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { AppConnect } from './lib'
import { UserRoute } from './routes'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/user', UserRoute)

AppConnect(app)
