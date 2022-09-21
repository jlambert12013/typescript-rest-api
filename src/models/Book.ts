import mongoose, { Document, Schema } from 'mongoose'
import Author from './Author'

export interface IBook {
  author: string
  Author: string
}

export interface IBookModel extends IBook, Document {}

const BookSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, required: true, ref: Author },
  },
  {
    versionKey: true,
    timestamps: true,
  }
)

export default mongoose.model<IBookModel>('Book', BookSchema)
