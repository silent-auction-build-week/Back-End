const express = require("express");

const middleware = require("./middleware/global");

// * import routes
const authRouter = require("./auth/auth-router");

const server = express();

middleware(server);

// * use routes
server.use("/auth", authRouter);

// * sanity
server.get("/", (req, res) =>
  res.status(200).json({ everyone: "good news there is" })
);

module.exports = server;
