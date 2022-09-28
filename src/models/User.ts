import mongoose, { Document, Schema, Types } from 'mongoose'

export interface IUserModel {
  _id: Types.ObjectId
  firstName: string
  lastName: string
  email: string
  password: string
  timestamp: Date
}

export interface IUserModel extends Document {}

const UserSchema: Schema = new Schema(
  {
    _id: Types.ObjectId,
    firstName: {
      type: String,
      required: [true, 'Please add a first name.'],
    },
    lastName: {
      type: String,
      required: [true, 'Please add a last name.'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email address.'],
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is a required field.'],
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<IUserModel>('User', UserSchema)
