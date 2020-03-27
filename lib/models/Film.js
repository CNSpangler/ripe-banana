const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  studio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Studio'
  },
  released: {
    type: Number,
    length: 4,
    required: true
  },
  cast: [{
    role: {
      type: String
    },
    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Actor'
    }
  }]
});

module.exports = mongoose.model('Film', schema);
