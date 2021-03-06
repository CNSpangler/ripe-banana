const { getStudio, getStudios, getFilms } = require('../db/data-helpers');
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
    const films = await getFilms({ 'studioId': studio._id });

    return request(app)
      .get(`/api/v1/studios/${studio._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...studio,
          films: films.map(film => ({
            _id: film._id,
            title: film.title,
            __v: 0
          }))
        });
      });
  });

  it('gets all studios', async() => {
    const studios = await getStudios();

    return request(app)
      .get('/api/v1/studios')
      .then(res => {
        studios.forEach(studio => {
          expect(res.body).toContainEqual({
            _id: studio._id,
            name: studio.name
          });
        });
      });
  });

  // it('updates a studio by id', async() => {
  //   const studio = await getStudio();

  //   return request(app)
  //     .patch(`/api/v1/studios/${studio._id}`)
  //     .send({ name: 'This Studio' })
  //     .then(res => {
  //       expect(res.body).toEqual(studio);
  //     });
  // });

  // it('deletes a studio by id', async() => {
  //   const studio = await getStudio();

  //   return request(app)
  //     .delete(`/api/v1/studios/${studio._id}`)
  //     .then(res => {
  //       expect(res.body).toEqual(studio);
  //     });
  // });
});
