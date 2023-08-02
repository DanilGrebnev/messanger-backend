import { Express } from 'express'
import mongoose from 'mongoose'

export const AppConnect = (app: Express) => {
    const port = process.env.PORT || 8091
    const domain = process.env.DOMAIN

    app.listen(port, () => {
        console.log('Server has been started on ' + domain + ':' + port)

        mongoose
            .connect('mongodb://127.0.0.1:27017/messanger')
            .then(() => console.log('Connect to DB is OK'))
            .catch(err => {
                console.log('Error connect to DB')
                console.log(err)
            })
    })
}
