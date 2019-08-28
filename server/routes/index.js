import city from './city'
import demand from './demand'
import fault from './fault'

const routes = [city, demand, fault]

export default function (app) {
  routes.forEach((route) => {
    app
      .use(route.routes())
      .use(route.allowedMethods({
        throw: true,
      }))
  })
}
