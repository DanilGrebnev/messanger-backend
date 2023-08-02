import { Express } from 'express'
import { ConnectToDatabase } from './ConnectToDatabase'

export const AppConnect = (app: Express) => {
    const port = process.env.PORT || 8091
    const domain = process.env.DOMAIN

    app.listen(port, () => {
        console.log('Server has been started on ' + domain + ':' + port)

        ConnectToDatabase()
    })
}
