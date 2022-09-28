import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import { Request, Response } from 'express'
import User, { IUserModel } from '../models/User'
import { genSalt, hash, compare } from 'bcrypt'
import generateToken from '../utils/generateToken'

// REGISTRATION - NEW USERS CONTROLLER - @route POST /api/users
// @desc    Register User
// @route   POST /api/user/rgister
// @access  Public
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { firstName, lastName, email, password }: IUserModel = req.body

    if (!firstName || !lastName || !email || !password) {
      res.status(400)
      throw new Error('Please include all fields.')
    }

    // Check for Duplication
    const userExists = await User.findOne({ email })

    if (userExists) {
      res.status(400)
      throw new Error(
        `${email} is already in use. Please login or use a different email addess to sign up.`
      )
    }

    // Hash Password using Bcrypt Salt
    const salt = await genSalt(10)
    const hashedPassword = await hash(password, salt)

    // Create User
    const user = await User.create({
      _id: new mongoose.Types.ObjectId(),
      firstName,
      lastName,
      email,
      password: hashedPassword,
    })

    // Store New User
    if (user) {
      user.save()
      res.status(201).json({
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Could not register user. Please try again later.')
    }
  }
)

// @desc    Login user
// @route   POST /api/user/login
// @access  Public
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password }: IUserModel = await req.body

  if (!email || !password) {
    res.status(400)
    throw new Error('Please include all fields.')
  }

  const user = await User.findOne({ email })

  if (user && (await compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.firstName,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Login failed. Please try again.')
  }
})
