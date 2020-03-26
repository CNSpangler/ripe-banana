const mongoose = require('mongoose');
const Studio = require('./Studio');

describe('Studio model', () => {
  it('has a required name', () => {
    const studio = new Studio();
    const { errors } = studio.validateSync();

    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('has all relevant fields', () => {
    const studio = new Studio({
      name: 'Yak Salt Studios',
      address: {
        city: 'Tibet',
        state: 'Yakity Yak',
        country: 'Nepal'
      }
    });

    expect(studio.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      name: 'Yak Salt Studios',
      address: {
        city: 'Tibet',
        state: 'Yakity Yak',
        country: 'Nepal'
      }
    });
  });
});
