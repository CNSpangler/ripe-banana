const { getReviewer, getReviewers } = require('../db/data-helpers');

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
});
