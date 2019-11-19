module.exports.up = function(knex) {
  return knex.schema.createTable("sellers", tbl => {
    tbl.increments();
    tbl.string("firstName").notNullable();
    tbl.string("lastName").notNullable();
    tbl
      .string("email ")
      .notNullable()
      .unique();
    tbl.string("streetAddress").notNullable();
    tbl.string("city").notNullable();
    tbl.string("state").notNullable();
    tbl.string("zipCode").notNullable();
    tbl
      .string("username")
      .notNullable()
      .unique();
    tbl.string("password").notNullable();
  });
};

module.exports.down = function(knex) {
  return knex.schema.dropTableIfExists("sellers");
};
