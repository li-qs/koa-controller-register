import { Context, Next } from 'koa'

export async function middleware0(ctx: Context, next: Next) {
    console.log('middleware 0')
    await next()
}

export async function middleware1(ctx: Context, next: Next) {
    console.log('middleware 1')
    await next()
}
