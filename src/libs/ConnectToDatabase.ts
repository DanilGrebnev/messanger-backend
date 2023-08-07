import mongoose from 'mongoose'

/**
 * Функция подключения к базе данных
 */
export const ConnectToDatabase = () => {
    const db_name = process.env.DB_NAME

    const url = 'mongodb://127.0.0.1:27017/' + db_name

    mongoose
        .connect(url, { autoIndex: true })
        .then(() => console.log(`Connect to "${db_name}" database is OK`))
        .catch(error => {
            console.error({ Message: 'Error connect to DB', error })
        })
}
