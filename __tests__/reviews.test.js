const { getReview, getReviews, getReviewer, getFilm } = require('../db/data-helpers');
const request = require('supertest');
const app = require('../lib/app');

describe('review routes', () => {  
  it('creates a film', async() => {
    const reviewer = await getReviewer();
    const film = await getFilm();

    return request(app)
      .post('/api/v1/reviews')
      .send({ 
        rating: 3,
        reviewerId: reviewer._id,
        review: 'Witpevze mappos isoletu fo res bi geow pofin mu rupoho revzi utva ne.',
        filmId: film._id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          rating: 3,
          reviewerId: reviewer._id,
          review: 'Witpevze mappos isoletu fo res bi geow pofin mu rupoho revzi utva ne.',
          filmId: film._id,
          __v: 0
        });
      });
  });
});
