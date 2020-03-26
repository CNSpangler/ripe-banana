const { getStudio } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('studio routes', () => {  
  it('creates a studio', () => {
    return request(app)
      .post('/api/v1/studios')
      .send({ name: 'A Studio!' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'A Studio!',
          __v: 0
        });
      });
  });
});
