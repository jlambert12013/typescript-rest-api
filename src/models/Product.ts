import mongoose, { Document, Schema } from 'mongoose'

export interface IProduct {
  type: string
}

export interface IProductModel extends IProduct, Document {}

const ProductSchema: Schema = new Schema(
  {
    type: { type: String, required: true },
  },
  { versionKey: false }
)

export default mongoose.model<IProductModel>('Product', ProductSchema)
