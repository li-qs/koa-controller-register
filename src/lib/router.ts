import 'reflect-metadata'
import Application, { Middleware } from 'koa'
import * as Router from '@koa/router'
import {
    FUNCTION_CONSTRUCTOR,
    METADATA_METHOD,
    METADATA_MIDDLEWARES,
    METADATA_PATH,
    METADATA_PREFIX,
} from './constants'

function generateRouter(cls: new () => void) {
    const prefix: string = Reflect.getMetadata(METADATA_PREFIX, cls)
    const middlewares: Middleware[] =
        Reflect.getMetadata(METADATA_MIDDLEWARES, cls) || []
    const funcNames: Array<string | symbol> = Reflect.ownKeys(
        cls.prototype
    )
    const controller = new cls()

    const router = new Router()
    router.prefix(prefix)
    router.use(...middlewares)

    funcNames.forEach((funcName) => {
        if (
            funcName === FUNCTION_CONSTRUCTOR || !controller[funcName] || 'function' !== typeof controller[funcName]
        ) return

        const func = controller[funcName]

        const method = Reflect.getMetadata(METADATA_METHOD, func)
        const path = Reflect.getMetadata(METADATA_PATH, func)
        const middlewares = Reflect.getMetadata(METADATA_MIDDLEWARES, func) || []

        if (!router[method] || 'function' !== typeof router[method] || !path) return

        router[method](path, ...middlewares, func)
    })

    return router
}

function use(app: Application, controller: new () => void) {
    const router = generateRouter(controller)
    app.use(router.routes()).use(router.allowedMethods())
}

export function registerControllers(
    app: Application,
    controllers: Array<new () => void>
) {
    controllers.forEach((controller) => use(app, controller))
}

export function useControllers(
    app: Application,
    ...controllers: Array<new () => void>
) {
    controllers.forEach((controller) => use(app, controller))
}

