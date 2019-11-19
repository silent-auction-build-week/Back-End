const faker = require("faker");

const generateRandom = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const createAuction = () => ({
  auction_start: faker.date.past(),
  auction_end: faker.date.future(),
  seller_id: generateRandom(1, 5),
  bidder_id: generateRandom(1, 5),
  item_id: generateRandom(1, 10)
});

module.exports.seed = async function(knex, Promise) {
  const auctions = [];
  for (let i = 0; i < 10; i++) {
    auctions.push(createAuction());
  }
  await knex("auctions").insert(auctions);
};
