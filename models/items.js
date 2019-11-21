const db = require("../data/dbConfig");

function get(table) {
  return db(table);
}

function getById(id) {
  console.log(id);
  return db("items").where({ id });
}
function getBySellerId(sellerId) {
  return db("items as i")
    .join("sellers as s", "i.seller_id", "s.id")
    .select(
      "s.firstName",
      "s.lastName",
      "s.email",
      "i.id",
      "i.item_name",
      "i.description",
      "i.img_url",
      "i.price"
    )
    .where("i.seller_id", sellerId);
}

function insert(sellerId, item) {
  const addItem = {
    ...item,
    seller_id: sellerId
  };
  return db("items").insert(addItem);
}

function update(id, changes) {
  return db("items")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("items")
    .where({ id })
    .del();
}

module.exports = {
  get,
  getById,
  getBySellerId,
  insert,
  update,
  remove
};
