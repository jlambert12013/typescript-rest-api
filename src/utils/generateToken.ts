import jwt from 'jsonwebtoken'
import { config } from '../config/config'
import { Types } from 'mongoose'

//  CREATE A JSON WEB TOKEN
export default (_id: Types.ObjectId) => {
  return jwt.sign({ _id }, config.jwt.key, { expiresIn: '30d' })
}
