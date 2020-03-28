const { getStudio, getActor, getActors, getFilms, getFilm, getReview, getReviews, getReviewer, getReviewers } = require('../db/data-helpers');
const request = require('supertest');
const app = require('../lib/app');

describe('film routes', () => {  
  it('creates a film', async() => {
    const studio = await getStudio();
    const actors = await getActors();

    return request(app)
      .post('/api/v1/films')
      .send({ 
        studioId: studio._id,
        title: 'Magic School Bus', 
        released: 1985,
        cast: [{
          role: 'bus',
          actorId: actors[0]._id
        }, {
          role: 'Carlos',
          actorId: actors[1]._id
        }, {
          role: 'Miss Frizzle',
          actorId: actors[2]._id
        }
        ]
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          studioId: studio._id,
          title: 'Magic School Bus', 
          released: 1985,
          cast: [{
            _id: expect.any(String),
            role: 'bus',
            actorId: actors[0]._id
          }, {
            _id: expect.any(String),
            role: 'Carlos',
            actorId: actors[1]._id
          }, {
            _id: expect.any(String),
            role: 'Miss Frizzle',
            actorId: actors[2]._id
          }
          ],
          __v: 0
        });
      });
  });

  it('gets all films', async() => {
    const films = await getFilms();

    return request(app)
      .get('/api/v1/films')
      .then(res => {
        films.forEach(async film => {
          expect(res.body).toContainEqual({
            _id: film._id,
            title: film.title,
            released: film.released,
            studioId: {
              _id: film.studioId,
              name: expect.any(String)
            },
          });
        });
      });
  });

  it('gets a film by id', async() => {
    const film = await getFilm();
    const reviewer = await getReviewer();
    const reviewers = await getReviewers();
    const actor = await getActor({ _id: film.cast[0].actorId });
    const reviews = await getReviews({ 'filmId': film._id });
    const review = getReview();

    return request(app)
      .get(`/api/v1/films/${film._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: film._id,
          title: film.title,
          released: film.released,
          studioId: {
            _id: film.studioId,
            name: expect.any(String)
          },
          cast: [{
            _id: film.cast[0]._id,
            role: film.cast[0].role,
            actorId: {
              _id: film.cast[0].actorId,
              name: actor.name
            }
          }],
          reviews: reviews.map(review => ({
            __v: 0,
            filmId: expect.any(String),
            _id: expect.any(String),
            rating: review.rating,
            review: review.review,
            reviewerId: {
              _id: review.reviewerId,
              name: expect.any(String)
            },
          })),
          __v: 0
        });
      });
  });
});
