const db = require("../data/dbConfig");

function get() {
  return db("bidders as b").select(
    "b.id",
    "b.firstName",
    "b.lastName",
    "b.email",
    "b.streetAddress",
    "b.city",
    "b.state",
    "b.zipCode",
    "b.username"
  );
}

function getById(id) {
  return db("bidders as b")
    .select(
      "b.id",
      "b.firstName",
      "b.lastName",
      "b.email",
      "b.streetAddress",
      "b.city",
      "b.state",
      "b.zipCode",
      "b.username"
    )
    .where(id);
}

function remove(id) {
  return db("bidders")
    .where({ id })
    .del();
}

module.exports = {
  get,
  getById,
  remove
};
