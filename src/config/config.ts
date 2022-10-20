import dotenv from 'dotenv'
dotenv.config()

export interface IMongo {
  uri: string
}

export interface IPort {
  port: number
}

export interface IKey {
  key: string
}

export interface IServerConfig {
  mongo: IMongo
  server: IPort
  jwt: IKey
}

const MONGO_USERNAME = process.env.MONGO_USERNAME ?? ''
const MONGO_PASSWORD = process.env.MONGO_PASSWORD ?? ''
const JWT_KEY = process.env.JWT_SECRET ?? ''
const MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.y9nsn.mongodb.net`
const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 1337

export const config: IServerConfig = {
  mongo: { uri: MONGO_URI },
  server: { port: SERVER_PORT },
  jwt: { key: JWT_KEY },
}
