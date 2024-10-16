import 'reflect-metadata'
import {
    HTTP_ALL,
    HTTP_DELETE,
    HTTP_GET, HTTP_PATCH, HTTP_POST, HTTP_PUT,
    METADATA_METHOD,
    METADATA_MIDDLEWARES,
    METADATA_PATH,
    METADATA_PREFIX,
} from './constants'
import { Middleware } from 'koa'

export function Controller(prefix?: string, middlewares?: Middleware[]) {
    prefix = prefix && prefix.length ? prefix : '/'
    return function (target: any) {
        Reflect.defineMetadata(METADATA_PREFIX, prefix, target)
        if (middlewares) Reflect.defineMetadata(METADATA_MIDDLEWARES, middlewares, target)
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

function httpMethod(method: string) {
    return function (path?: string, middlewares?: Middleware[]): MethodDecorator {
        path = path && path.length ? path : '/'
        return function (
            target: any,
            propertyKey: string | symbol,
            descriptor: TypedPropertyDescriptor<any>
        ) {
            middlewares = middlewares || []

            Reflect.defineMetadata(METADATA_METHOD, method, descriptor.value)
            Reflect.defineMetadata(METADATA_PATH, path, descriptor.value)
            Reflect.defineMetadata(METADATA_MIDDLEWARES, middlewares, descriptor.value)

            return descriptor
        }
    }
}

export const Get = httpMethod(HTTP_GET)
export const Post = httpMethod(HTTP_POST)
export const Delete = httpMethod(HTTP_DELETE)
export const Put = httpMethod(HTTP_PUT)
export const Patch = httpMethod(HTTP_PATCH)
export const All = httpMethod(HTTP_ALL)
