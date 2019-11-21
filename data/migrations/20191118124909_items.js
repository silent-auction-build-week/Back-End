module.exports.up = function(knex) {
  return knex.schema.createTable("items", tbl => {
    tbl.increments();
    tbl.string("item_name", 100).notNullable();
    tbl.string("description", 500).notNullable();
    tbl.string("img_url");
    tbl.float("price", 8, 2);
    tbl.datetime("item_end_time").notNullable();
    tbl
      .integer("seller_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("sellers")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

module.exports.down = function(knex) {
  return knex.schema.dropTableIfExists("items");
};
