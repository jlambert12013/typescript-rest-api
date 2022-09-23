import dotenv from 'dotenv'
dotenv.config()

const MONGO_USERNAME = process.env.MONGO_USERNAME ?? ''
const MONGO_PASSWORD = process.env.MONGO_PASSWORD ?? ''
const MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@mastinmediacluster.tjyei.mongodb.net/`
const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 1337

export const config = {
  mongo: { uri: MONGO_URI },
  server: { port: SERVER_PORT },
}
