const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRoute = require("../auth/auth-router");
const auctRoute = require("./auctions/auctRoute.js");
const bidRoute = require("./bidding/bidRoute.js");
const userRoute = require("./user/userRoute.js");
const help = require("../api/help.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use(express.static("middleware"));
server.use("/auth", authRoute);
server.use("/api/auctions", help.verifyToken, auctRoute);
server.use("/api/bids", help.verifyToken, bidRoute);
server.use("/api/user", help.verifyToken, userRoute);
server.get("/", (req, res) => {
  res.send("Thanks for bidding with us!");
});

module.exports = server