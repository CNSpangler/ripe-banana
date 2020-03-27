const { getStudio, getActors, getFilms, getFilm } = require('../db/data-helpers');
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
        films.forEach(film => {
          expect(res.body).toContainEqual({
            _id: film._id,
            title: film.title,
            released: film.released,
            studioId: {
              _id: film.studioId,
              name: expect.any(String)
            }
          });
        });
      });
  });

  it('gets a film by id', async() => {
    const film = await getFilm();

    return request(app)
      .get(`/api/v1/films/${film._id}`)
      .then(res => {
        expect(res.body).toEqual(film);
      });
  });
});
