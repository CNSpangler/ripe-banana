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

  it('gets a reviewer by id', async() => {
    const reviewer = await getReviewer();

    return request(app)
      .get(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual(reviewer);
      });
  });

  it('updates a reviewer by id', async() => {
    const reviewer = await getReviewer();

    return request(app)
      .patch(`/api/v1/reviewers/${reviewer._id}`)
      .send({ name: 'Miss Frizzle' })
      .then(res => {
        expect(res.body).toEqual(reviewer);
      });

  });
});
