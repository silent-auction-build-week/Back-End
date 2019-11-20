const cors = require('cors');
const helmet = require('helmet');
const express = require('express');

const help = require('../api/help.js');
const authRoute = require('../auth/auth-router');
const auctRoute = require('./auctions/auctRoute.js');
const bidRoute = require('./bidding/bidRoute.js');
const userRoute = require('./user/userRoute.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use(express.static('public'));
server.use("/api/auth", authRoute);
server.use("/api/auction", help.verifyToken, auctRoute);
server.use("/api/bids", help.verifyToken, bidRoute);
server.use("/api/user", help.verifyToken, userRoute);
server.get("/", (req,res) => {
  res.send("Thanks for bidding with us!");
})