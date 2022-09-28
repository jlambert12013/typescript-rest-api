import { Request, Response } from 'express'
import mongoose from 'mongoose'
import Product from '../models/Product'

// @desc    Add product
// @route   POST /api/products/
// @access  Private
export async function addProduct(
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> {
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

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export async function getProducts(
  _req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> {
  return Product.find()
    .then((product) => res.status(200).json({ product }))
    .catch((error) => res.status(500).json({ error }))
}

// @desc    Get single product
// @route   GET /api/product/id
// @access  Public
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

// @desc    Update product
// @route   PATCH /api/products/id
// @access  Private
export async function updateProduct(
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | undefined> {
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

// @desc    Remove product
// @route   DELETE /api/products/id
// @access  Public
export async function removeProduct(
  req: Request,
  res: Response
): Promise<void> {
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
