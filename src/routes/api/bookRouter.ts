import { Router } from 'express'
import {
  createBook,
  readAll,
  readBook,
  removeBook,
  updateBook,
} from '../../controllers/authorController'

const router = Router()

router.get('/', readAll)
router.get('/:bookId', readBook)
router.post('/create', createBook)
router.patch('/update/:bookId', updateBook)
router.delete('/:bookId', removeBook)

export default router
