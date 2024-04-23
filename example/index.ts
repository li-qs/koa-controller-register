import Application from 'koa'
import PingController from './ping.controller'
import {useControllers} from '../src'

const app = new Application()

useControllers(app, PingController)

app.listen(8080)
