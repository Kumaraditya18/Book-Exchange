const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  owner: String,
  location: String,
  contact: String,
  status: {
    type: String,
    default: 'Available',
    enum: ['Available', 'Rented'],
  },
  coverImage: {
    type: String,
    default: '', // Optional: can set a default placeholder image URL here
  }
});

module.exports = mongoose.model('Book', bookSchema);
