require("dotenv").config();
const request = require("supertest");
const server = require("./api/server.js");
const dBase = require("./data/dbConfig.js");

describe("testing auth endpoints", function() {
  describe("POST to endpoint", function() {
    beforeEach(async () => await dBase("bidders").truncate());

    it("Will return code of 201 upon successful registration", async () => {
      const response = await request(server)
        .post("/auth/register/bidders")
        .send({
          username: "bidder",
          password: "password",
          firstName: "bidder",
          lastName: "bidder",
          email: "user@bidder.com",
          streetAddress: "123",
          city: "Bidder",
          state: "bidder",
          zipCode: "12345"
        });
      expect(response.status).toBe(201);
    });
    it("Will return a token upon successful login", async () => {
      const response = await request(server)
        .post("/auth/login/bidders")
        .send({ username: "testseller", password: "password" });
      expect(response.body.token).toBe();
    });
  });
});