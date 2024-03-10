import { config } from './config/config'
import express, { Application, Request, Response, NextFunction } from 'express'
import { OAuth2Client } from 'google-auth-library'
import http from 'http'
import log from './library/log'
import userRouter from './routes/api/userRouter'

const app: Application = express()
const client = new OAuth2Client()

async function verify(token: string) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  })

  console.log(`\n\x1b[0mTICKET\x1b[0m`)
  console.log(ticket)

  const payload = ticket.getPayload()
  console.log(payload)
  // const userid = payload['sub']
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}



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

  app.post(`/api/session/oauth/google`, (req, res) => {
    console.log("POST REQUEST FROM CLIENT")
    // console.log(`REQUEST FROM CLIENT: ${req.header}`)
    // console.log(`RESPONSE FROM CLIENT: ${res}`)
    const headers = req.headers
    const body = req.body

    console.log(`HEADERS`)
    console.log(headers)
    console.log(`BODY`)
    console.log(body)

    verify(body.idToken)

  })



  // MARK: Routes
  app.use('/api/user', userRouter)

  //MARK: Testing OAuth2.0
  app.get("/api/sessions/oauth/google", (req: Request, res: Response) => {
    console.log(res)
    res.json({ messsage: "SUCCESS" })
  })


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
