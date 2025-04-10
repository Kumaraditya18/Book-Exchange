const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Get all books
router.get('/', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// Add new book
router.post('/', async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).json({ message: 'Book listed successfully' });
});

// Toggle book status
router.patch('/:id/status', async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });

  book.status = book.status === 'Available' ? 'Rented' : 'Available';
  await book.save();
  res.json({ message: 'Book status updated', status: book.status });
});

module.exports = router;
