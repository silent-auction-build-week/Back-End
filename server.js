const express = require("express");

const middleware = require("./middleware/global");
// todo import routes
const authRouter = require("./auth/auth-router");

const server = express();

middleware(server);

// todo server.use routes
server.use("/auth", authRouter);

//* sanity
server.get("/", (req, res) => res.json({ everyone: "good news there is" }));

module.exports = server;
