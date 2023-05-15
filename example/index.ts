import * as Application from 'koa'
import PingController from './ping.controller'
import { registerControllers } from '../src'

const controllers = [PingController]
const app = new Application()
// ...
registerControllers(app, controllers)
app.listen(8080)
