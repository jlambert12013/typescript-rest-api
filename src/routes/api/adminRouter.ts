// Express
import express from 'express'
import protect from '../../middleware/auth'
import adminContoller from '../../controllers/adminController'

const router = express.Router()

router.get('/', protect, adminContoller)

module.exports = router
