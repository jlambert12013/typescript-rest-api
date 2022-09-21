import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config({ path: '../../.env' })

const JWTS = process.env.JWT_SECRET ?? ''

//  CREATE A JSON WEB TOKEN
const generateToken = (id: string) => {
  return jwt.sign({ id }, JWTS, { expiresIn: '30d' })
}

module.exports = generateToken
