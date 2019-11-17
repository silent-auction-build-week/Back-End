const knex = require("knex");

const knexConfig = require("../knexfile");

// module.exports = knex(knexConfig.development);

const environment = process.env.DB_ENV || "development";

module.exports = knex(knexConfig[environment]);
