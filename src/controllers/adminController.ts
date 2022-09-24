import { Response } from 'express'

// @desc    Add product
// @route   GET /api/products/
// @access
export async function adminContoller(res: Response): Promise<void> {
  res.send('ADMIN')
}
