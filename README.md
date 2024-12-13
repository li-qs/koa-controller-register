# koa-controller-register

An ES6 decorator based router, support auto load controllers.

```shell
$ npm install koa-controller-register
```

## decorators

### class decorators:
- `@Middlewares()`
- `@Controller()`

### method decorators:
- `@Get()`
- `@Post()`
- `@Delete()`
- `@Put()`
- `@Patch()`
- `@All()`
- `@Middlewares()`
- `@Before()`

## example

- example/index.ts :
```typescript
import Application from 'koa'
import { useControllers } from 'koa-controller-register'
import PingController from './ping.controller'

const controllers = [PingController]
const app = new Application()
// ...
useControllers(app, controllers)
app.listen(8080)
```

- example/middlewares.ts :
```typescript
import { Context, Next } from 'koa'

export async function middleware0(ctx: Context, next: Next) {
    console.log('middleware 0')
    await next()
}

export async function middleware1(ctx: Context, next: Next) {
    console.log('middleware 1')
    await next()
}
```

- example/ping.controller.ts :
```typescript
import { Context } from 'koa'
import { Before, Controller, Get, Middlewares } from 'koa-controller-register'
import { middleware0, middleware1 } from './middlewares'

@Controller('/')
@Middlewares(middleware0)
export default class PingController {
    @Get('/ping')
    async ping(ctx: Context) {
        ctx.body = 'pong' // will print "middleware 0"
    }

    @Get('/example')
    @Before(middleware1)
    async test(ctx: Context) {
        ctx.body = 'test' // will print "middleware 0\n middleware 1"
    }
}
```
