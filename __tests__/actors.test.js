const { getActor, getActors, getFilms } = require('../db/data-helpers');

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

  it('gets an actor by id', async() => {
    const actor = await getActor();
    const films = await getFilms({ 'cast.actorId': actor._id });

    return request(app)
      .get(`/api/v1/actors/${actor._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...actor,
          films: films.map(film => ({
            _id: film._id,
            title: film.title,
            released: film.released,
            cast: film.cast
          })),
          __v: 0,
        });
      });
  });

  it('gets all actors', async() => {
    const actors = await getActors();

    return request(app)
      .get('/api/v1/actors')
      .then(res => {
        actors.forEach(actor => {
          expect(res.body).toContainEqual({
            _id: actor._id,
            name: actor.name
          });
        });
      });
  });
});
