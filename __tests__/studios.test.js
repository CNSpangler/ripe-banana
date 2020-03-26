const { getStudio, getStudios } = require('../db/data-helpers');

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

  it('gets a studio by id', async() => {
    const studio = await getStudio();

    return request(app)
      .get(`/api/v1/studios/${studio._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...studio
        });
      });
  });

  it('gets all studios', async() => {
    const studios = await getStudios();

    return request(app)
      .get('/api/v1/studios')
      .then(res => {
        expect(res.body).toEqual(studios);
      });
  });

  it('updates a studio by id', async() => {
    const studio = await getStudio();

    return request(app)
      .patch(`/api/v1/studios/${studio._id}`)
      .send({ name: 'This Studio' })
      .then(res => {
        expect(res.body).toEqual(studio);
      });
  });
});
