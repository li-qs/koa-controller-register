import { Context } from 'koa'
import { middleware0, middleware1 } from './middlewares'
import { Before, Controller, Get, Middlewares } from '../src'

@Controller('/')
@Middlewares(middleware0)
export default class PingController {
    @Get('/ping')
    async ping(ctx: Context) {
        ctx.body = 'pong'
    }

    @Get('/example')
    @Before(middleware1)
    async test(ctx: Context) {
        ctx.body = 'test'
    }
}
