// Express
import { Response, Router } from 'express'
import protect from '../../middleware/auth'

const router = Router()

async function adminRouter(res: Response) {
  res.send('HELLO')
}

export default adminRouter
