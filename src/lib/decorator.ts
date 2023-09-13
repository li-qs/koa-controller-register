import 'reflect-metadata'
import {
    METADATA_METHOD,
    METADATA_MIDDLEWARES,
    METADATA_PATH,
    METADATA_PREFIX,
    REQUEST_METHODS,
} from './constants'
import { Middleware } from 'koa'

export function Controller(prefix?: string) {
    prefix = prefix && prefix.length ? prefix : '/'
    return function (target: any) {
        Reflect.defineMetadata(METADATA_PREFIX, prefix, target)
    }
}

export function Middlewares(...middlewares: Middleware[]) {
    return function (target: any) {
        Reflect.defineMetadata(METADATA_MIDDLEWARES, middlewares, target)
    }
}

export function Before(...middlewares: Middleware[]) {
    return function (
        target: any,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<any>
    ) {
        Reflect.defineMetadata(
            METADATA_MIDDLEWARES,
            middlewares,
            descriptor.value
        )
        return descriptor
    }
}

export const Get = createMethodDecorator(REQUEST_METHODS.GET)
export const Post = createMethodDecorator(REQUEST_METHODS.POST)
export const Delete = createMethodDecorator(REQUEST_METHODS.DELETE)
export const Put = createMethodDecorator(REQUEST_METHODS.PUT)
export const Patch = createMethodDecorator(REQUEST_METHODS.PATCH)
export const Options = createMethodDecorator(REQUEST_METHODS.OPTIONS)
export const Head = createMethodDecorator(REQUEST_METHODS.HEAD)
export const All = createMethodDecorator(REQUEST_METHODS.ALL)

function methodDecorator(method: string, path: string) {
    return function (
        target: any,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<any>
    ) {
        Reflect.defineMetadata(METADATA_METHOD, method, descriptor.value)
        Reflect.defineMetadata(METADATA_PATH, path, descriptor.value)
        return descriptor
    }
}

function createMethodDecorator(method: string) {
    return function (path?: string): MethodDecorator {
        path = path && path.length ? path : '/'
        return methodDecorator(method, path)
    }
}
