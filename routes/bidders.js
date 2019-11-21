const router = require("express").Router();

const Bidder = require("../models/bidders");
const restricted = require("../middleware/restricted");

router.get("/bidders", (req, res) => {
  Bidder.get()
    .then(bidders => res.status(200).json({ bidders }))
    .catch(error => res.status(500).json(error.message));
});

router.get("/bidders/:id", (req, res) => {
  const id = req.params;

  Bidder.getById(id)
    .then(bidder => res.status(200).json({ bidder }))
    .catch(error => res.status(500).json(error.message));
});

router.delete("/bidders/:id", restricted, (req, res) => {
  const { id } = req.params;

  Bidder.remove(id)
    .then(() => res.status(200).json({ message: "bidder removed" }))
    .catch(error => res.status(500).json(error.message));
});

module.exports = router;
