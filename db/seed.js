const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const Reviewer = require('../lib/models/Reviewer');
const chance = require('chance').Chance();

// specifying the number of tweets to create with our seed function
module.exports = async({ studiosToCreate = 10, actorsToCreate = 10, reviewersToCreate = 10 } = {}) => {
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
  }))
  );

  // const genres = ['Science Fiction', 'Fantasy', 'Non-Fiction', 'YA', 'Horror', 'Romance'];
  // await Book.create([...Array(booksToCreate)].map(() => ({
  //   authorId: chance.pickone(authors)._id,
  //   title: chance.sentence(),
  //   genre: chance.pickone(genres),
  // })));
};
