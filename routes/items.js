/* eslint-disable camelcase */
const router = require("express").Router();

const restricted = require("../middleware/restricted");
const Item = require("../models/items");

router.get("/items", (req, res) => {
  Item.get("items")
    .then(items => res.status(200).json({ items }))
    .catch(error => res.status(500).json(error.message));
});

router.get("/items/:id", (req, res) => {
  const id = req.params;

  Item.getById("items", id)
    .then(item => res.status(200).json({ item }))
    .catch(error => res.status(500).json(error.message));
});

router.get("/:sellerId/items", (req, res) => {
  const { sellerId } = req.params;

  Item.getBySellerId(sellerId)
    .then(items => res.status(200).json({ items }))
    .catch(error => res.status(500).json(error.message));
});

router.post("/:sellerId/items", restricted, (req, res) => {
  const { sellerId } = req.params;
  const item = req.body;
  const { item_name, description, price } = item;

  if (!item_name || !description || !price) {
    res
      .status(400)
      .json({ message: "Please fill in the required information" });
  } else {
    Item.insert(sellerId, item)
      .then(addItem =>
        res.status(201).json({ message: "item added" }, { addItem })
      )
      .catch(error => res.status(500).json(error.message));
  }
});

router.put("/items/:itemId", restricted, (req, res) => {
  const { itemId } = req.params;
  const changes = req.body;
  const { item_name, description, price } = changes;

  if (!item_name || !description || !price) {
    res.status(400).json({ message: "Please fill in the required fields" });
  } else {
    Item.update(itemId, changes)
      .then(item => res.status(200).json({ message: "Item updated" }, { item }))
      .catch(error => res.status(500).json(error.message));
  }
});

router.delete("/items/:itemId", restricted, (req, res) => {
  const { itemId } = req.params;

  Item.remove(itemId)
    .then(() => res.status(200).json({ message: "Item removed" }))
    .catch(error => res.status(500).json(error.message));
});

module.exports = router;
