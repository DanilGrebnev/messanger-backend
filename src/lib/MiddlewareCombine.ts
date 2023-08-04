import { Express } from 'express'

type TMiddlewareCombine = (app: Express, ...args: any[]) => void

/**
 * Собирает все middleware и прокидывает их в app.use() функцию
 * @param app  - Express приложение
 * @param args - любые middleware
 */
export const MiddlewareCombine: TMiddlewareCombine = (app, ...args) => {
    args.forEach(middleware => app.use(middleware))
}
