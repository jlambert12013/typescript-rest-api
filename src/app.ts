import express, { Application } from 'express'
import mongoose from 'mongoose'
import http from 'http'
import log from './library/log'
import authorRouter from './routes/api/authorRouter'
import { config } from './config/config'

const router: Application = express()

//  MARK: Connect Database
mongoose
  .connect(config.mongo.uri, { retryWrites: true, w: 'majority' })
  .then(() => {
    log.success('DATABASE CONNECTED ')
    startServer()
  })
  .catch(() => log.error('MONGO NOT CONNECTED!'))

// MARK: Server
function startServer() {
  // Request
  router.use((req, res, next) => {
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
  router.use(express.urlencoded({ extended: true }))
  router.use(express.json())

  //  API Rules and Options
  router.use((req, res, next) => {
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
  router.use('/authors', authorRouter)

  // MARK: Health Check
  router.get('/ping', (req, res) =>
    res.status(200).json({ message: 'SUCCESS' })
  )

  // MARK: Error Handler
  router.use((req, res) => {
    const error = new Error('ROUTE WAS NOT FOUND...')
    log.error(error)
    return res.status(404).json({ message: error.message })
  })

  // MARK: Create Server
  http.createServer(router).listen(config.server.port, () => {
    log.success(`SERVER RUNNING ON PORT ${config.server.port}`)
  })
}
