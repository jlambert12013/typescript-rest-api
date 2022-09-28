import { Request, Response, NextFunction } from 'express'
import { config } from 'dotenv'
import jwt from 'jsonwebtoken'
import UserSchema from '../models/User'
config()

export async function protect(req: Request, res: Response, next: NextFunction) {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET ?? '')
      // Get user from token
      await UserSchema.findById(decoded).select('-password')
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
}
