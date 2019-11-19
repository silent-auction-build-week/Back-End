/* eslint-disable func-names */
/* eslint-disable no-return-await */
/* eslint-disable no-undef */
/* eslint-disable node/no-unpublished-require */
const request = require("supertest");

const server = require("../server");
const dBase = require("../data/dbConfig");

test("should set dBase environment to testing", function() {
  expect(process.env.DB_ENV).toBe("testing");
});

describe("Bidder Registration and Login", function() {
  describe("POST to /auth/register/bidders", function() {
    beforeEach(async () => await dBase("bidders").truncate());

    test("Successful Bidder registration returns status 201 CREATED", async () => {
      const res = await request(server)
        .post("/auth/register/bidders")
        .send({
          firstName: "bidder",
          lastName: "bidder",
          email: "user@bidder.com",
          streetAddress: "123456",
          city: "bidder",
          state: "bidder",
          zipCode: "48195",
          username: "bidder",
          password: "1234"
        });
      expect(res.status).toBe(201);
    });

    test("Successful Bidder registration returns a token", async () => {
      const res = await request(server)
        .post("/auth/register/bidders")
        .send({
          firstName: "bidder",
          lastName: "bidder",
          email: "user@bidder.com",
          streetAddress: "123456",
          city: "bidder",
          state: "bidder",
          zipCode: "48195",
          username: "bidder",
          password: "1234"
        });
      expect(res.body.token);
    });
  });
  describe("POST to /auth/login/bidders", function() {
    test("Successful Bidder login returns status 200 OK", async () => {
      const res = await request(server)
        .post("/auth/login/bidders")
        .send({ username: "bidder", password: "1234" });
      expect(res.status).toBe(200);
    });

    test("Successful Bidder login returns a token", async () => {
      const res = await request(server)
        .post("/auth/login/bidders")
        .send({ username: "bidder", password: "1234" });
      expect(res.body.token);
    });

    test("Unsuccessful Bidder login returns status 401 UNAUTHORIZED", async () => {
      const res = await request(server)
        .post("/auth/login/bidders")
        .send({ username: "bidder", password: "thewrongone" });
      expect(res.status).toBe(401);
    });
  });
});

describe("Seller Registration and Login", function() {
  describe("POST to /auth/register/sellers", function() {
    beforeEach(async () => await dBase("sellers").truncate());

    test("Successful Bidder registration returns status 201 CREATED", async () => {
      const res = await request(server)
        .post("/auth/register/sellers")
        .send({
          firstName: "seller",
          lastName: "seller",
          organization: "seller",
          email: "user@seller.com",
          streetAddress: "123456",
          city: "seller",
          state: "seller",
          zipCode: "48195",
          username: "seller",
          password: "1234"
        });
      expect(res.status).toBe(201);
    });

    test("Successful Bidder registration returns a token", async () => {
      const res = await request(server)
        .post("/auth/register/sellers")
        .send({
          firstName: "seller",
          lastName: "seller",
          organization: "seller",
          email: "user@seller.com",
          streetAddress: "123456",
          city: "seller",
          state: "seller",
          zipCode: "48195",
          username: "seller",
          password: "1234"
        });
      expect(res.body.token);
    });
  });
  describe("POST to /auth/login/sellers", function() {
    test("Successful Bidder login returns status 200 OK", async () => {
      const res = await request(server)
        .post("/auth/login/sellers")
        .send({ username: "seller", password: "1234" });
      expect(res.status).toBe(200);
    });

    test("Successful Bidder login returns a token", async () => {
      const res = await request(server)
        .post("/auth/login/sellers")
        .send({ username: "seller", password: "1234" });
      expect(res.body.token);
    });

    test("Unsuccessful Bidder login returns status 401 UNAUTHORIZED", async () => {
      const res = await request(server)
        .post("/auth/login/sellers")
        .send({ username: "seller", password: "thewrongone" });
      expect(res.status).toBe(401);
    });
  });
});
