import mongoose from 'mongoose'

export const ConnectToDatabase = () => {
    const db_name = process.env.DB_NAME

    mongoose
        .connect('mongodb://127.0.0.1:27017/' + db_name)
        .then(() => console.log(`Connect to "${db_name}" database is OK`))
        .catch(err => {
            console.log('Error connect to DB')
            console.log(err)
        })
}
