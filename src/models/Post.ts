import { Document, Schema, Types, model } from 'mongoose'

// post interface
export interface IPost extends Document {
  title: string
  content: string
  thumbnail?: string
  status: 'draft' | 'published' | 'trashed'
  views: number
  user: Types.ObjectId
}

// post schema
const PostSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    thumbnail: String,
    status: {
      type: String,
      enum: ['draft', 'published', 'trashed'],
      default: 'draft',
    },
    views: {
      type: Number,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
)

// create and export post model
export const PostModel = model<IPost>('Post', PostSchema)
