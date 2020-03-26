const { getActor, getActors } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('actor routes', () => {  
  it('creates an actor', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({ name: 'Miss Frizzle' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Miss Frizzle',
          __v: 0
        });
      });
  });
});
