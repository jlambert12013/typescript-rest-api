import jwt from 'jsonwebtoken'
import User from '../models/User'
import asyncHandler from 'express-async-handler'
import * as dotenv from 'dotenv'
dotenv.config()

const JWTS = process.env.JWT_SECRET ?? ''
const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const verifiedJWT = jwt.verify(token, JWTS)

      // Get user from token
      await User.findById(verifiedJWT)
        .select('password')
        .then((res) => console.log(res))

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not Authorized.')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not Authorized, no token.')
  }
})

export default module.exports = protect
