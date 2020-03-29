const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const Reviewer = require('../lib/models/Reviewer');
const Film = require('../lib/models/Film');
const Review = require('../lib/models/Review');
const chance = require('chance').Chance();

module.exports = async({ studiosToCreate = 5, actorsToCreate = 5, reviewersToCreate = 5, filmsToCreate = 10, reviewsToCreate = 25 } = {}) => {
  const studios = await Studio.create([...Array(studiosToCreate)].map(() => ({
    name: chance.name(),
    address: {
      city: chance.city(),
      state: chance.state(),
      country: chance.country()
    }
  })));

  const actors = await Actor.create([...Array(actorsToCreate)].map(() => ({
    name: chance.name(),
    dob: chance.date(),
    pob: chance.city()
  })));

  const reviewers = await Reviewer.create([...Array(reviewersToCreate)].map(() => ({
    name: chance.name(),
    company: chance.string()
  })));

  const films = await Film.create([...Array(filmsToCreate)].map(() => ({
    title: chance.string(),
    studioId: chance.pickone(studios)._id,
    released: chance.year(),
    cast: [{
      role: chance.animal(),
      actorId: chance.pickone(actors)._id
    }]
  })));

  await Review.create([...Array(reviewsToCreate)].map(() => ({
    rating: chance.integer({ min: 1, max: 5 }),
    reviewerId: chance.pickone(reviewers)._id,
    review: chance.sentence(),
    filmId: chance.pickone(films).id
  })));
};
