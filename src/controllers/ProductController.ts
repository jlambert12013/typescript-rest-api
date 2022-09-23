import { Request, Response } from 'express'
import mongoose from 'mongoose'
import Product from '../models/Product'

//  MARK: Create Product
export async function addProduct(req: Request, res: Response) {
  const { name } = req.body

  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name,
  })

  return await product
    .save()
    .then((product) => res.status(200).json({ product }))
    .catch((error) => res.status(500).json({ error }))
}

// MARK:  Read All Products
export async function getProducts(req: Request, res: Response) {
  return Product.find()
    .then((product) => res.status(200).json({ product }))
    .catch((error) => res.status(500).json({ error }))
}

// MARK:  Read Single Product
export async function getProduct(req: Request, res: Response) {
  const productID = req.params.productId
  return Product.findById(productID)
    .then((product) =>
      product
        ? res.status(200).json({ product })
        : res.status(404).json({ message: 'AUTHOR NOT FOUND' })
    )
    .catch((error) => res.status(500).json({ error }))
}

// MARK:  Update Single Product
export async function updateProduct(req: Request, res: Response) {
  const productID = req.params.productId

  return Product.findById(productID)
    .then((product) => {
      if (product) {
        product.set(req.body)

        return product
          .save()
          .then((product) => res.status(201).json({ product }))
          .catch((error) => res.status(500).json({ error }))
      } else {
        res.status(404).json({ message: 'AUTHOR NOT FOUND' })
      }
    })
    .catch((error) => res.status(500).json({ error }))
}

// MARK:  Remove Product
export async function removeProduct(req: Request, res: Response) {
  const productID = req.params.productId

  Product.findByIdAndDelete(productID)
    .then((product) =>
      product
        ? res
            .status(201)
            .json({ message: `REMOVED AUTHOR WITH ID ${productID}` })
        : res
            .status(404)
            .json({ message: `AUTHOR WITH ID ${productID} NOT FOUND` })
    )
    .catch((error) => res.status(500).json({ error }))
}
