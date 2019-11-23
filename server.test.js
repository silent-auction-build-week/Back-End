require("dotenv").config();
const request = require("supertest");
const server = require("./api/server.js");
const dBase = require("./data/dbConfig.js");

let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InRlc3RzZWxsZXIiLCJzZWxsZXIiOjEsImlhdCI6MTU3MTg2Mzg2OCwiZXhwIjoxNTcyMTIzMDY4fQ.nU35QublVEs5T-sRLOFIi7JNyo0wrNHZv_IsiIb7Pfg";

describe("testing bidder endpoints", function() {
  describe("POST to endpoint", function() {
    dBase("bidders")
      .del()
      .where({ username: "testtest" });
    it("Will return a code of 201 upon successful registration", () => {
      return request(server)
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
        })
        .then(res => {
          return expect(res.body).toBeTruthy();
        });
    });
    it("Will return a token upon successful login", async () => {
      const response = await request(server)
        .post("/auth/login/bidders")
        .send({ username: "testseller", password: "password" });
      token = response.body.token;
      console.log(token);
      return expect(response.body.token).toBe();
    });
  });
});

describe("testing seller endpoints", function() {
  describe("POST to endpoint", function() {
    dBase("sellers")
      .del()
      .where({ username: "testtest" });
    it("Will return a code of 201 upon successful registration", () => {
      return request(server)
        .post("/auth/register/sellers")
        .send({
          username: "seller",
          password: "password",
          firstName: "seller",
          lastName: "seller",
          email: "user@seller.com",
          streetAddress: "123",
          city: "Seller",
          state: "seller",
          zipCode: "12345"
        })
        .then(res => {
          return expect(res.body).toBeTruthy();
        });
    });
    it("Will return a token upon successful login", async () => {
      const response = await request(server)
        .post("/auth/login/sellers")
        .send({ username: "testseller", password: "password" });
      token = response.body.token;
      console.log(token);
      return expect(response.body.token).toBe();
    });
  });
});