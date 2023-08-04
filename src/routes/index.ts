import { TRouters } from '../types'

import { UserRoute } from './UserRoute'
import { DialogRoute } from './DialogRoute'
import { MessageRoute } from './MessageRoute'

export const routers: TRouters = [
    ['/user', UserRoute],
    ['/dialog', DialogRoute],
    ['/messages', MessageRoute],
]
