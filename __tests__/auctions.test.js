/* eslint-disable func-names */
/* eslint-disable no-return-await */
/* eslint-disable no-undef */
/* eslint-disable node/no-unpublished-require */
const request = require("supertest");

const server = require("../server");
const db = require("../data/dbConfig");

test("should set db environment to testing", function() {
  expect(process.env.DB_ENV).toBe("testing");
});

describe("Get, add, update, remove auctions", function() {
  describe("Get auctions based on criteria", () => {
    test("GET /api/auctions returns all auctions in JSON format and status 200 OK", async () => {
      const res = await request(server).get("/api/auctions");

      expect(res.status).toBe(200);
      expect(res.type).toMatch(/json/i);
    });
    test("GET /api/:sellerId/auctions returns all auctions by sellerId in JSON format and status 200 OK", async () => {
      const res = await request(server).get("/api/1/auctions");

      expect(res.status).toBe(200);
      expect(res.type).toMatch(/json/i);
    });
    test("GET /:sellerId/auctions returns all auctions from specified Seller in JSON format and status 200 OK", async () => {
      const res = await request(server).get("/api/1/items");

      expect(res.status).toBe(200);
      expect(res.type).toMatch(/json/i);
    });
  });
  describe("POST to /api/:sellerId/:itemId/auctions", function() {
    test("Returns status 401 UNAUTHORIZED if token not present", async () => {
      const res = await request(server).post("/api/1/2/auctions");

      expect(res.status).toBe(401);
    });
    describe("PUT to /api/auctions/:auctionId", function() {
      test("Returns status 401 UNAUTHORIZED if token not present", async () => {
        const res = await request(server).put("/api/auctions/1");

        expect(res.status).toBe(401);
      });
    });
    describe("DELETE to /api/auctions/:auctionId", function() {
      test("Returns status 401 UNAUTHORIZED if token not present", async () => {
        const res = await request(server).delete("/api/auctions/1");

        expect(res.status).toBe(401);
      });
    });
  });
});
