// Express
import { Router } from 'express'
import { adminContoller } from '../../controllers/adminController'
import protect from '../../middleware/auth'

const router = Router()

router.get('/admin', protect, adminContoller)

export default router
