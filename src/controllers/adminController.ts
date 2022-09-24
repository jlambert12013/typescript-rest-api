import { Response } from 'express'

// @desc    Admin Dashbaoard
// @route   GET /api/admin
// @access  Private
export async function adminContoller(res: Response) {
  res.send('ADMIN')
}
