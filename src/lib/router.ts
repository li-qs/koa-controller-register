import 'reflect-metadata'
import Application, { Middleware } from 'koa'
import * as Router from '@koa/router'
import {
    METADATA_METHOD,
    METADATA_MIDDLEWARES,
    METADATA_PATH,
    METADATA_PREFIX,
} from './constants'

function generateRouter(obj: new () => void): Router {
    const prefix: string = Reflect.getMetadata(METADATA_PREFIX, obj)
    const middlewares: Middleware[] =
        Reflect.getMetadata(METADATA_MIDDLEWARES, obj) || []
    const funcNames: Array<string | symbol> = Reflect.ownKeys(
        obj.prototype
    )
    const controller = new obj()

    const router = new Router()
    router.prefix(prefix)
    router.use(...middlewares)

    funcNames.forEach((funcName) => {
        if (
            funcName === 'constructor' || !controller[funcName] || 'function' !== typeof controller[funcName]
        ) {
            return
        }

        const func = controller[funcName]

        const method = Reflect.getMetadata(METADATA_METHOD, func)
        const path = Reflect.getMetadata(METADATA_PATH, func)
        const middlewares = Reflect.getMetadata(METADATA_MIDDLEWARES, func) || []

        if (!router[method] || 'function' !== typeof router[method] || !path) {
            return
        }

        router[method](path, ...middlewares, func)
    })

    return router
}

export function useControllers(
    app: Application,
    ...controllers: Array<new () => void>
) {
    controllers.forEach((controller) => {
        const router = generateRouter(controller)
        app.use(router.routes())
        app.use(router.allowedMethods)
    })
}
