const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  studioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Studio',
    required: true
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
    actorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Actor',
    }
  }],
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
      // delete ret.__v;
    }
  }
});

schema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'reviewerId'
});


module.exports = mongoose.model('Film', schema);
