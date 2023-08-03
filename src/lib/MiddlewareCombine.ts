import { Express } from 'express'

/**
 * Собирает все middleware и прокидывает их в app.use() функцию
 * @param app  - Express приложение
 * @param args - любые middleware
 */
export const MiddlewareCombine = (app: Express, ...args: any[]) => {
    app.use(...args)
}
