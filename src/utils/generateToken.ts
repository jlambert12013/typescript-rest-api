import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import { Types } from 'mongoose'
config()

const JWTS = process.env.JWT_SECRET ?? ''

//  CREATE A JSON WEB TOKEN
export default (_id: Types.ObjectId) => {
  return jwt.sign({ _id }, JWTS, { expiresIn: '30d' })
}
