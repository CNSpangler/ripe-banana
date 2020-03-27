const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  studio: {
    IMPORT ID OF STUDIO
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
      IMPORT ID OF ACTOR
    }
  }]
});

module.exports = mongoose.model('Film', schema);
