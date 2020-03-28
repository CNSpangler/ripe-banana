const { Router } = require('express');
const Film = require('../models/Film');

module.exports = Router()
  .post('/', (req, res, next) => {
    Film
      .create(req.body)
      .then(film => res.send(film))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Film
      .find()
      .populate('studioId', 'name')
      .select({
        title: true,
        released: true,
        studioId: true
      })
      .then(films => res.send(films))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Film
      .findById(req.params.id)
      .populate('studioId', 'name')
      .populate('cast.actorId', 'name')
      .populate('reviewId')
      .populate({
        path: 'reviews',
        populate: { path: 'filmId', select: { name: true } }
      })
      .then(film => res.send(film))
      .catch(next);
  });
