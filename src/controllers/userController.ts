import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import { Request, Response } from 'express'
import User, { IUserModel } from '../models/User'
import { compare, genSalt, hash } from 'bcrypt'
import generateToken from '../utils/generateToken'
import { OAuth2Client } from 'google-auth-library'

// REGISTRATION - NEW USERS CONTROLLER
// @desc    Register User
// @route   POST /api/user/register
// @params  firstName, lastName, email, password
// @access  Public
export const registerUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password }: IUserModel = req.body

  if (!firstName || !lastName || !email || !password) {
    res.status(400).json({ message: 'PLEASE INCLUDE ALL REQUIRED FIELDS' })
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


// LOGIN - LOGIN CONTROLLER
// @desc    Login user
// @route   POST /api/user/login
// @params  email, password
// @access  Public
export const loginUser = async (req: Request, res: Response) => {
  const { email, password }: IUserModel = await req.body

  if (!email || !password) {
    res.status(400)
    throw new Error('Please provide a valid email and password.')
  }

  const user = await User.findOne({ email })

  if (!user) {
    res.status(400)
    throw new Error(`${email} doesn't exsist.`)
  }

  if (user && (await compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.firstName,
      email: user.email,
    })
  } else {
    res.status(400)
    throw new Error('Login failed. Please try again.')
  }
}

//  VERIFY - GOOGLE OAUTH2 CLIENT TOKEN VERFICATION 
// @desc    Check itegrity of token provided by the client
// @route   POST /verify
// @params  token
// @access  Private
export const verifyUser = async (req: Request, res: Response) => {
  const header = req.header

  console.log(header)
  // const client = new OAuth2Client
  // const ticket = client.verifyIdToken({
  //   idToken: ,
  //   audience: clientId
  // })

  // console.log(ticket)




  // const payload = ticket.getPayload()
  // const userid = payload['sub']
  // If the request specified a Google Workspace domain:
  // const domain = payload['hd'];
}