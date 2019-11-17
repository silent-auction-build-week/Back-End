const db = require("../data/dbConfig");

function insert(table, user) {
  return db.insert(user).into(table);
}

function findBy(table, user) {
  return db(table).where(user);
}

module.exports = {
  insert,
  findBy
};
