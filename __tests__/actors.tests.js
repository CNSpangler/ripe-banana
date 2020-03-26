const { getActor, getActors } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');

describe('actor routes', () => {  
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

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

  it('gets an actor by id', async() => {
    const actor = await getActor();

    return request(app)
      .get(`/api/v1/actors/${actor._id}`)
      .then(res => {
        expect(res.body).toEqual(actor);
      });
  });

  it('gets all actors', async() => {
    const actors = await getActors();

    return request(app)
      .get('/api/v1/actors')
      .then(res => {
        expect(res.body).toEqual(actors);
      });
  });
});
