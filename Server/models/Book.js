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
  }
});

module.exports = mongoose.model('Book', bookSchema);
