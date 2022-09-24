import mongoose, { Document, Schema } from 'mongoose'

export interface IProduct {
  category: string
}

export interface IProductModel extends IProduct, Document {}

const ProductSchema: Schema = new Schema(
  {
    manufacturer: String,
    model: String,
    category: {
      type: String,
      enum: [
        'ATV',
        'Amphibious',
        'Boat',
        'Go Cart',
        'Golf Cart',
        'Lawn Mower',
        'UTV',
        'Vehicle',
      ],
      required: true,
    },
    condition: {
      type: String,
      enum: ['New', 'Used', 'Demo'],
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    milage: {
      type: Number,
      require: false,
    },
    hours: {
      type: Number,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    options: {
      type: Array,
      required: false,
    },
    // image: {
    //   type: Image,
    //   required: false,
    // },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
  { versionKey: false }
)

export default mongoose.model<IProductModel>('Product', ProductSchema)
