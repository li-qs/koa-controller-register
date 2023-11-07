# koa-controller-register

An ES6 decorator based router that supports autoloading controllers, which are responsible for handling incoming requests and returning responses to the client.

npm: [https://www.npmjs.com/package/koa-controller-register]()

github: [https://github.com/li-qs/koa-controller-register]()

## How to use

## Install

```shell
npm install koa-controller-register
```

or

```shell
yarn add koa-controller-register
```

## Routing

The `@Controller()` decorator define a basic controller, and specify a route path prefix. 

The `@Get()` decorator create a handler for a specify endpoint for HTTP requests. Code in this method is no different from a usual Koa handler.

In the following example, we created a controller to handle the `GET` requests which send to `/demo/hello`:

```typescript
// demo.controller.ts

import { Controller } from 'koa-controller-register'
import { Context } from 'koa'

@Controller('/demo')
export class DemoController {
    @Get('/hello')
    hello(ctx: Context) {
        const name = ctx.query.name || 'world'
        ctx.body = `Hello, ${name}!`
    }
}
```

## Middleware

### Router-level middleware

The code of router-level middleware is no different from a usual, but the using method is different:

- by `@Get()` decorator, only requests send to this handler are processed (also `@Post()`, `@Delete()`, `@Put()`, `@Patch()`, `@All()`).
- by `@Controller()` decorator, handle requests send to all handlers in this class.

```typescript
// demo.controller.ts

import { Controller } from 'koa-controller-register'
import { Context } from 'koa'
import { reqLog } from './reqlog.middleware'

@Controller('/demo', [reqLog])
export class DemoController {
    @Get('/hello', [reqLog])
    hello(ctx: Context) {
        const name = ctx.query.name || 'world'
        ctx.body = `Hello, ${name}!`
    }
}
```

```typescript
// reqlog.middleware.ts

export default async function reqLog(ctx: Context, next: Next) {
    const start = Date.now()
    await next()
    console.log(`${ctx.method} ${ctx.originalUrl} ${ctx.status} ${Date.now() - start}ms`)
}
```

### Application-level middleware

Not within the scope of our discussion, just code and use it as usual:

```typescript
import Application from 'koa'
import { reqLog } from 'reqlog.middleware'

const app = new Application()
app.use(reqLog)

//...
```

## Load controllers (Load routers)

```typescript
// main.ts
import Application from 'koa'
import { registerControllers } from 'koa-controller-register'
import { DemoController } from './demo.controller'

const app = new Application()
// ...
registerControllers(app, [DemoController])
app.listen('0.0.0.0:8080')
```

## Decorators

Controller class decorators:

- `@Middlewares()` - A controller class decorator, **deprecated !!!**
- `@Controller()`

Controller method decorators:

- `@Get()`
- `@Post()`
- `@Delete()`
- `@Put()`
- `@Patch()`
- `@All()`
- `@Before()` - A controller method decorator, **deprecated !!!**
