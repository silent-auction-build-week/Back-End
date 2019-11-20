const db = require("../data/dbConfig");

function get() {
  return db("sellers as s").select(
    "s.id",
    "s.firstName",
    "s.lastName",
    "s.email",
    "s.streetAddress",
    "s.city",
    "s.state",
    "s.zipCode",
    "s.username"
  );
}

function getById(id) {
  return db("sellers as s")
    .select(
      "s.id",
      "s.firstName",
      "s.lastName",
      "s.email",
      "s.streetAddress",
      "s.city",
      "s.state",
      "s.zipCode",
      "s.username"
    )
    .where(id);
}

function remove(id) {
  return db("sellers")
    .where({ id })
    .del();
}

module.exports = {
  get,
  getById,
  remove
};
