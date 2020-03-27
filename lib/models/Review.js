const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  reviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reviewer',
    required: true
  },
  review: {
    type: String,
    maxlength: 140,
    required: true
  },
  filmId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Film',
    required: true
  }
});

module.exports = mongoose.model('Review', schema);
