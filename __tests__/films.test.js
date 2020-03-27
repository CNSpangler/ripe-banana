const { getFilm, getFilms } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('film routes', () => {  
  it('creates a film', () => {
    return request(app)
      .post('/api/v1/films')
      .send({ 
        title: 'Magic School Bus', 
        studio: 'A Studio',
        released: 1985,
        cast: [{
          role: 'bus',
          actor: 'Miss Frizzle'
        }, {
          role: 'Carlos',
          actor: 'Carlos'
        }, {
          role: 'Miss Frizzle',
          actor: 'bus'
        }
        ]
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String), 
          title: 'Magic School Bus', 
          studio: 'A Studio',
          released: 1985,
          cast: [{
            role: 'bus',
            actor: 'Miss Frizzle'
          }, {
            role: 'Carlos',
            actor: 'Carlos'
          }, {
            role: 'Miss Frizzle',
            actor: 'bus'
          }
          ],         
          __v: 0
        });
      });
  });
});
