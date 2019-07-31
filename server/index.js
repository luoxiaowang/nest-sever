import bodyParser from 'koa-bodyparser'
import Koa from 'koa'
import logger from 'koa-logger'
import cors from 'koa2-cors'
import mongoose from 'mongoose'
import restc from 'restc'
import routing from './routes/'
import { port, connexionString } from './config'

mongoose.Promise = global.Promise;
mongoose.connect(connexionString)
mongoose.connection.on('error', console.error)

// Create Koa Application
const app = new Koa()

app
  .use(logger())
  .use(restc.koa2())
  .use(bodyParser())
  .use(cors({
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
    maxAge: 100,
    credentials: true,
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
  }))

routing(app)

// Start the application
app.listen(port, () => console.log(`✅  The server is running at http://localhost:${port}/`))

export default app
