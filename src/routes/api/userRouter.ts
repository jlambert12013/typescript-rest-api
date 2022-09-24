// Express
import express = require('express')

const router = express.Router()
const protect = require('../../middleware/authMiddleware')
const {
  loginUser,

  registerUser,
} = require('../../controller/userController')

// Routes
router.post('/register', registerUser)
router.post('/login', loginUser)

module.exports = router
