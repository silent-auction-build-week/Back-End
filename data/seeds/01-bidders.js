const bcrypt = require("bcryptjs");
const faker = require("faker");

module.exports.seed = function(knex) {
  return knex("bidders").insert([
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: "bidder1@test.com",
      streetAddress: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zipCode: faker.address.zipCode(),
      username: "bidder1",
      password: bcrypt.hashSync("1234")
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: "bidder2@test.com",
      streetAddress: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zipCode: faker.address.zipCode(),
      username: "bidder2",
      password: bcrypt.hashSync("1234")
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: "bidder3@test.com",
      streetAddress: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zipCode: faker.address.zipCode(),
      username: "bidder3",
      password: bcrypt.hashSync("1234")
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: "bidder4@test.com",
      streetAddress: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zipCode: faker.address.zipCode(),
      username: "bidder4",
      password: bcrypt.hashSync("1234")
    }
  ]);
};
