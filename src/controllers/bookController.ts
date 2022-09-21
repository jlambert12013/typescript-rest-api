import { Request, Response } from 'express'
import mongoose from 'mongoose'
import Book from '../models/Book'

//  MARK: Create Book
export async function createBook(req: Request, res: Response) {
  const { name } = req.body

  const book = new Book({
    _id: new mongoose.Types.ObjectId(),
    name,
  })

  return await book
    .save()
    .then((book) => res.status(200).json({ book }))
    .catch((error) => res.status(500).json({ error }))
}

// MARK:  Read All books
export async function readAll(req: Request, res: Response) {
  return Book.find()
    .then((books) => res.status(200).json({ books }))
    .catch((error) => res.status(500).json({ error }))
}

// MARK:  Read Single Book
export async function readBook(req: Request, res: Response) {
  const bookID = req.params.bookId
  return Book.findById(bookID)
    .then((book) =>
      book
        ? res.status(200).json({ book })
        : res.status(404).json({ message: 'BOOK NOT FOUND' })
    )
    .catch((error) => res.status(500).json({ error }))
}

// MARK:  Update Single Book
export async function updateBook(req: Request, res: Response) {
  const bookID = req.params.bookId

  return Book.findById(bookID)
    .then((book) => {
      if (book) {
        book.set(req.body)

        return book
          .save()
          .then((book) => res.status(201).json({ book }))
          .catch((error) => res.status(500).json({ error }))
      } else {
        res.status(404).json({ message: 'BOOK NOT FOUND' })
      }
    })
    .catch((error) => res.status(500).json({ error }))
}

// MARK:  Remove Book
export async function removeBook(req: Request, res: Response) {
  const bookID = req.params.bookId

  Book.findByIdAndDelete(bookID)
    .then((book) =>
      book
        ? res.status(201).json({ message: `REMOVED book WITH ID ${bookID}` })
        : res.status(404).json({ message: `book WITH ID ${bookID} NOT FOUND` })
    )
    .catch((error) => res.status(500).json({ error }))
}
