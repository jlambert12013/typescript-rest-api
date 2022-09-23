import { Router } from 'express'
import {
  addProduct,
  getProducts,
  getProduct,
  removeProduct,
  updateProduct,
} from '../../controllers/ProductController'

const router = Router()

router.get('/', getProducts)
router.get('/:id', getProduct)
router.post('/', addProduct)
router.patch('/:id', updateProduct)
router.delete('/:id', removeProduct)

export default router
