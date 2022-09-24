import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { Types } from 'mongoose'
dotenv.config({ path: '../../.env' })

const JWTS = process.env.JWT_SECRET ?? ''

//  CREATE A JSON WEB TOKEN
export const generateToken = (_id: Types.ObjectId) => {
  return jwt.sign({ _id }, JWTS, { expiresIn: '30d' })
}
