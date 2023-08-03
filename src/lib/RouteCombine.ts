import { Express, Router } from 'express'
import { TRouters } from '../types'

type TRouterCombine = (app: Express, routers: TRouters) => void

/**
 * Функция собирает все роуты и прокидывает их в app.use() функцию
 * @param app - Express приложение
 * @param routers - массив кортежей типа [url: string, router: Router][]
 */
export const RouteCombine: TRouterCombine = (app, routeArray) => {
    routeArray.forEach(([routeUrl, router]) => app.use(routeUrl, router))
}
