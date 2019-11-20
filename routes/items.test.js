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

describe("Get, add, update, remove items", function() {
  describe("Get items based on criteria", () => {
    test("GET /api/items returns all items in JSON format and status 200 OK", async () => {
      const res = await request(server).get("/api/items");

      expect(res.status).toBe(200);
      expect(res.type).toMatch(/json/i);
    });
    test("GET /api/items/:id returns an item by itemId in JSON format and status 200 OK", async () => {
      const res = await request(server).get("/api/items/1");

      expect(res.status).toBe(200);
      expect(res.type).toMatch(/json/i);
    });
    test("GET /:sellerId/items returns all items from specified Seller in JSON format and status 200 OK", async () => {
      const res = await request(server).get("/api/1/items");

      expect(res.status).toBe(200);
      expect(res.type).toMatch(/json/i);
    });
  });

  describe("POST to /api/:sellerId/item", function() {
    test("Returns status 401 UNAUTHORIZED if token not present", async () => {
      const res = await request(server).post("/api/1/item");

      expect(res.status).toBe(401);
    });
    describe("PUT to /api/items/:itemId", function() {
      test("Returns status 401 UNAUTHORIZED if token not present", async () => {
        const res = await request(server).put("/api/items/1");

        expect(res.status).toBe(401);
      });
    });
    describe("DELETE to /api/items/:itemId", function() {
      test("Returns status 401 UNAUTHORIZED if token not present", async () => {
        const res = await request(server).delete("/api/items/1");

        expect(res.status).toBe(401);
      });
    });
  });
});
