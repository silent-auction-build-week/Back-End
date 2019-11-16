const bcrypt = require("bcryptjs");
const faker = require("faker");

module.exports.seed = function(knex) {
  return knex("sellers").insert([
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      organization: faker.company.companyName(),
      email: "seller1@test.com",
      streetAddress: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zipCode: faker.address.zipCode(),
      username: "seller1",
      password: bcrypt.hashSync("1234")
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      organization: faker.company.companyName(),
      email: "seller2@test.com",
      streetAddress: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zipCode: faker.address.zipCode(),
      username: "seller2",
      password: bcrypt.hashSync("1234")
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      organization: faker.company.companyName(),
      email: "seller3@test.com",
      streetAddress: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zipCode: faker.address.zipCode(),
      username: "seller3",
      password: bcrypt.hashSync("1234")
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      organization: faker.company.companyName(),
      email: "seller4@test.com",
      streetAddress: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zipCode: faker.address.zipCode(),
      username: "seller4",
      password: bcrypt.hashSync("1234")
    }
  ]);
};
