import { Response } from 'express'

export default function adminController(req: Request, res: Response) {
  res.send('Welcome, Admin')
}
