module.exports.up = function(knex) {
  return knex.schema.createTable("auctions", tbl => {
    tbl.increments();
    tbl.datetime("auction_start").notNullable();
    tbl.datetime("auction_end").notNullable();
    tbl
      .integer("seller_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("sellers")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl
      .integer("bidder_id")
      .unsigned()
      .references("id")
      .inTable("bidders")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl
      .integer("item_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("items")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

module.exports.down = function(knex) {
  return knex.schema.dropTableIfExists("auctions");
};
