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
router.post('/new', addProduct)
router.patch('/update/:id', updateProduct)
router.delete('/:id', removeProduct)

export default router
