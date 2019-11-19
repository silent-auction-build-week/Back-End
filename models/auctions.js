const db = require("../data/dbConfig");

function get() {
  return db("auctions as a")
    .join("sellers as s", "a.seller_id", "s.id")
    .join("items as i", "a.item_id", "i.id")
    .select(
      "s.firstName",
      "s.lastName",
      "s.email",
      "i.item_name",
      "i.description",
      "i.img_url",
      "i.price",
      "a.auction_start",
      "a.auction_end"
    );
}

function getBySellerId(sellerId) {
  return db("auctions as a")
    .join("sellers as s", "a.seller_id", "s.id")
    .join("items as i", "a.item_id", "i.id")
    .select(
      "s.firstName",
      "s.lastName",
      "s.email",
      "i.item_name",
      "i.description",
      "i.img_url",
      "i.price",
      "a.auction_start",
      "a.auction_end"
    )
    .where("a.seller_id", sellerId);
}

function getByAuctionId(id) {
  return db("auctions as a")
    .join("sellers as s", "a.seller_id", "s.id")
    .join("items as i", "a.item_id", "i.id")
    .select(
      "s.firstName",
      "s.lastName",
      "s.email",
      "i.item_name",
      "i.description",
      "i.img_url",
      "i.price",
      "a.auction_start",
      "a.auction_end"
    )
    .where("a.id", id);
}

function insert(sellerId, itemId, time) {
  const newAuction = {
    ...time,
    seller_id: sellerId,
    item_id: itemId
  };
  return db("auctions").insert(newAuction);
}

function remove(id) {
  return db("auctions")
    .where({ id })
    .del();
}

module.exports = {
  get,
  getBySellerId,
  getByAuctionId,
  insert,
  remove
};
