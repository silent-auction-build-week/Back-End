const dBase = require("../data/dbConfig");

function insert(table, user) {
  return dBase.insert(user).into(table);
}

function findBy(table, user) {
  return dBase(table).where(user);
}

module.exports = {
  insert,
  findBy
};
