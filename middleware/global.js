const express = require("express"),
  helmet = require("helmet"),
  cors = require("cors"),
  morgan = require("morgan");

module.exports = server => {
  server.use(helmet());
  server.use(cors());
  server.use(morgan("dev"));
  server.use(express.json());
};
