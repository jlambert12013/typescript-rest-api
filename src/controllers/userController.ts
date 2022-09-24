import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import User from '../models/User'
import { genSalt, hash, compare } from 'bcrypt'
import { generateToken } from '../utils/generateToken'

// REGISTRATION - NEW USERS CONTROLLER - @route POST /api/users
export const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  if (!firstName || !lastName || !email || !password) {
    res.status(400)
    throw new Error('Please include all fields.'.toUpperCase())
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
    res.status(201).json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Could not register user. Please try again later.')
  }
})

//  LOGIN CONTROLLER -  @route POST /api/users/login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const userEmail = await User.findOne({ email })

  if (userEmail && (await compare(password, email))) {
    res.json({
      _id: userEmail.id,
      name: userEmail.firstName,
      email: userEmail.email,
      token: generateToken(userEmail._id),
    })
  } else {
    res.status(400)
    throw new Error('Login failed. Please try again.')
  }
})
