import Application, {Context} from "koa";
import {Controller, Get, useControllers} from "../src";

@Controller('/')
class TestController {
    @Get('/ping')
    async ping(ctx: Context) {
        ctx.body = 'pong'
    }
}

const app = new Application();
useControllers(app, TestController)

export default app
