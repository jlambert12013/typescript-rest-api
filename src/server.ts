import { config } from './config/config'
import express, { Application, Request, Response, NextFunction } from 'express'
import http from 'http'
import log from './library/log'
import userRouter from './routes/api/userRouter'

const app: Application = express()

/** 
 * SERVER OBJECT */
export default () => {

  // MIDDLWARE 
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use((req: Request, res: Response, next: NextFunction) => {
    log.success(
      `Incoming -> Method: [${req.method}] - URL: [${req.url}] - Ip: [${req.socket.remoteAddress}]`
    )

    res.on('finish', () => {
      log.success(
        `Incoming -> Method: [${req.method}] - URL: [${req.url}] - Ip: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
      )
    })
    next()
  })

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



  // ROUTES
  app.use('/api/user', userRouter)

  // Testing OAuth2.0
  app.post("", (req: Request, res: Response) => {
    // console.log("RESPONSE: \(res)")
    console.log(req.header)
  })

  // HEALTH CHECKER
  app.all('/ping', (_req: Request, res: Response) =>
    res.status(200).json({ message: 'SUCCESS' })
  )

  // ERROR HANDLER
  app.use((_req: Request, res: Response) => {
    const error = new Error('ROUTE WAS NOT FOUND...')
    log.error(error)
    return res.status(404).json({ message: error.message })
  })

  // START SERVRER
  http.createServer(app).listen(config.server.port, () => {
    log.success(`SERVER RUNNING ON PORT ${config.server.port}`)
  })
}
