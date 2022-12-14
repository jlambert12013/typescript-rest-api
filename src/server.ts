import { config } from './config/config'
import express, { Application, Request, Response, NextFunction } from 'express'
import http from 'http'
import log from './library/log'
import userRouter from './routes/api/userRouter'

const app: Application = express()

export default () => {
  // Request
  app.use((req: Request, res: Response, next: NextFunction) => {
    log.success(
      `Incoming -> Method: [${req.method}] - URL: [${req.url}] - Ip: [${req.socket.remoteAddress}]`
    )

    // Response
    res.on('finish', () => {
      log.success(
        `Incoming -> Method: [${req.method}] - URL: [${req.url}] - Ip: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
      )
    })

    next()
  })

  // Middleware
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  //  API Rules and Options
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )

    if (req.method == 'OPTIONS') {
      res.header(
        'Access-Control-Allow-Methods',
        'PUT, POST, PATCH, DELETE, GET'
      )
      return res.status(200).json({})
    }

    next()
  })

  // MARK: Routes
  app.use('/api/user', userRouter)

  // MARK: Health Check
  app.all('/ping', (_req: Request, res: Response) =>
    res.status(200).json({ message: 'SUCCESS' })
  )

  // MARK: Error Handler
  app.use((_req: Request, res: Response) => {
    const error = new Error('ROUTE WAS NOT FOUND...')
    log.error(error)
    return res.status(404).json({ message: error.message })
  })

  // MARK: Create Server
  http.createServer(app).listen(config.server.port, () => {
    log.success(`SERVER RUNNING ON PORT ${config.server.port}`)
  })
}
