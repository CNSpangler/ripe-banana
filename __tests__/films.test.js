const { getStudio, getStudios, getActor, getActors } = require('../db/data-helpers');
const Studio = require('../lib/models/Studio');

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
        expect(res.body).toEqual(films);
      });
  });
});
