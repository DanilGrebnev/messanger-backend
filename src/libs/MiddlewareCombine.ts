import { TMiddlewareCombine } from '../types'

/**
 * Собирает все middleware и прокидывает их в app.use() функцию
 * @param app  - Express приложение
 * @param args - любые middleware
 */
export const MiddlewareCombine: TMiddlewareCombine = (
    app,
    middlewares: any[]
) => {
    middlewares.forEach(middleware => app.use(middleware))
}
