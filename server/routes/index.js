import city from './city'
import demand from './demand'
import fault from './fault'
import schedule from './schedule'

const routes = [city, demand, fault, schedule]

export default function (app) {
  routes.forEach((route) => {
    app
      .use(route.routes())
      .use(route.allowedMethods({
        throw: true,
      }))
  })
}
