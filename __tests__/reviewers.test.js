const { getReviewer, getReviewers, getReview, getReviews, getFilms } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('reviewer routes', () => {  
  it('creates a reviewer', () => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({ name: 'Miss Frizzle', company: 'Magic School Bus' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Miss Frizzle',
          company: 'Magic School Bus',
          __v: 0
        });
      });
  });

  it('gets all reviewers', async() => {
    const reviewers = await getReviewers();

    return request(app)
      .get('/api/v1/reviewers')
      .then(res => {
        expect(res.body).toEqual(reviewers);
      });
  });

  it('gets a reviewer by id', async() => {
    const reviewer = await getReviewer();
    console.log(reviewer);
    const reviews = await getReviews({ 'reviewerId': reviewer._id });
    const films = await getFilms();

    return request(app)
      .get(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...reviewer,
          reviews: reviews.map(review => ({
            _id: review._id,
            rating: review.rating,
            review: review.review,
            reviewerId: expect.any(String),
            filmId: {
              _id: review.filmId,
              title: films.find(film => film._id === review.filmId).title
            },
            __v: 0
          }))
        });
      });
  });

  it('updates a reviewer by id', async() => {
    const reviewer = await getReviewer();

    return request(app)
      .patch(`/api/v1/reviewers/${reviewer._id}`)
      .send({ name: 'Miss Frizzle' })
      .then(res => {
        expect(res.body).toEqual({ 
          ...reviewer,
          name: 'Miss Frizzle'
        });
      });
  });

  it('deletes a reviewer by id', async() => {
    const reviewer = await getReviewer();

    return request(app)
      .delete(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual(reviewer);
      });
  });
});
