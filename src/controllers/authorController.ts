import { Request, Response } from 'express'
import mongoose from 'mongoose'
import Author from '../models/Author'

//  MARK: Create Author
export async function createAuthor(req: Request, res: Response) {
  const { name } = req.body

  const author = new Author({
    _id: new mongoose.Types.ObjectId(),
    name,
  })

  return await author
    .save()
    .then((author) => res.status(200).json({ author }))
    .catch((error) => res.status(500).json({ error }))
}

// MARK:  Read All Authors
export async function readAll(req: Request, res: Response) {
  return Author.find()
    .then((authors) => res.status(200).json({ authors }))
    .catch((error) => res.status(500).json({ error }))
}

// MARK:  Read Single Author
export async function readAuthor(req: Request, res: Response) {
  const authorID = req.params.authorId
  return Author.findById(authorID)
    .then((author) =>
      author
        ? res.status(200).json({ author })
        : res.status(404).json({ message: 'AUTHOR NOT FOUND' })
    )
    .catch((error) => res.status(500).json({ error }))
}

// MARK:  Update Single Author
export async function updateAuthor(req: Request, res: Response) {
  const authorID = req.params.authorId

  return Author.findById(authorID)
    .then((author) => {
      if (author) {
        author.set(req.body)

        return author
          .save()
          .then((author) => res.status(201).json({ author }))
          .catch((error) => res.status(500).json({ error }))
      } else {
        res.status(404).json({ message: 'AUTHOR NOT FOUND' })
      }
    })
    .catch((error) => res.status(500).json({ error }))
}

// MARK:  Remove Author
export async function removeAuthor(req: Request, res: Response) {
  const authorID = req.params.authorId

  Author.findByIdAndDelete(authorID)
    .then((author) =>
      author
        ? res
            .status(201)
            .json({ message: `REMOVED AUTHOR WITH ID ${authorID}` })
        : res
            .status(404)
            .json({ message: `AUTHOR WITH ID ${authorID} NOT FOUND` })
    )
    .catch((error) => res.status(500).json({ error }))
}
