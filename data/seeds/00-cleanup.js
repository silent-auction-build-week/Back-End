const cleaner = require("knex-cleaner");

module.exports.seed = function(knex) {
  return cleaner.clean(knex, {
    ignoreTables: ["knex_migrations", "knex_migrations_lock"] // don't empty migration tables
  });
};
