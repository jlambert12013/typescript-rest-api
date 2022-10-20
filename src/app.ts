import { config } from './config/config'
import { connect } from 'mongoose'
import log from './library/log'
import server from './server'

connect(config.mongo.uri, {
  retryWrites: true,
  w: 'majority',
})
  .then(() => {
    log.success('MONGO CONNECTED') // MONGO CONNECTED
    server() // START SERVER
  })
  .catch(() => {
    log.error('MONGO CONNECTION FAILED') // MONGO FAILED
  })
