import { Router } from 'express'
import {
  createAuthor,
  readAll,
  readAuthor,
  removeAuthor,
  updateAuthor,
} from '../../controllers/authorController'

const router = Router()

router.get('/', readAll)
router.get('/:authorId', readAuthor)
router.post('/create', createAuthor)
router.patch('/update/:authorId', updateAuthor)
router.delete('/:authorId', removeAuthor)

export default router
