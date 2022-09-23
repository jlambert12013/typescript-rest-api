// user.model.ts
import { Document, Schema, model } from 'mongoose'

// Create the interface
export interface IUser extends Document {
  firstName: string
  lastName: string
  email: string
  password: string
  photo?: string
  birthday?: Date
}

// Create the schema
const UserSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: String,
    birthday: String,
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
)

// Create and export user model
export const UserModel = model<IUser>('User', UserSchema)
