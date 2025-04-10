const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  location: String,
  contact: String,
  owner: String,
  status: { type: String, default: 'Available' } // Available, Rented
});

module.exports = mongoose.model('Book', bookSchema);
