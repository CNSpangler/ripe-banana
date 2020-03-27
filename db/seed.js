const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const Reviewer = require('../lib/models/Reviewer');
const Film = require('../lib/models/Film');
const chance = require('chance').Chance();

// specifying the number of tweets to create with our seed function
module.exports = async({ studiosToCreate = 10, actorsToCreate = 10, reviewersToCreate = 10, filmsToCreate = 10 } = {}) => {
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
      actor: chance.pickone(actors)._id
    }]
  })));
};
