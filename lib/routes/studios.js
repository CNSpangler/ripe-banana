const { Router } = require('express');
const Studio = require('../models/Studio');

module.exports = Router()
  .post('/', (req, res, next) => {
    Studio
      .create(req.body)
      .then(studio => res.send(studio))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Studio
      .findById(req.params.id)
      .populate('films', { cast: false, released: false })
      .lean()
      .then(studio => {
        studio.films.forEach(film => {
          delete film.studioId;
        });
        res.send(studio);
      })
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Studio
      .find()
      .select({ name: true })
      .then(studios => res.send(studios))
      .catch(next);
  });

// .patch('/:id', (req, res, next) => {
//   Studio
//     .findByIdAndUpdate(req.params.id)
//     .then(studio => res.send(studio))
//     .catch(next);
// })

// .delete('/:id', (req, res, next) => {
//   Studio
//     .findByIdAndDelete(req.params.id)
//     .then(studio => res.send(studio))
//     .catch(next);
// });
