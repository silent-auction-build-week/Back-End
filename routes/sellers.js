const router = require("express").Router();

const Seller = require("../models/users");
// const Seller = require("../models/sellers");
const restricted = require("../middleware/restricted");

router.get("/sellers", (req, res) => {
  Seller.get("sellers", null)
    .then(sellers => res.status(200).json({ sellers }))
    .catch(error => res.status(500).json(error.message));
});

router.get("/sellers/:id", (req, res) => {
  const id = req.params;

  Seller.get("sellers", id)
    .then(seller => res.status(200).json({ seller }))
    .catch(error => res.status(500).json(error.message));
});

router.delete("/sellers/:id", restricted, (req, res) => {
  const { id } = req.params;

  Seller.remove("sellers", id)
    .then(() => res.status(200).json({ message: "seller removed" }))
    .catch(error => res.status(500).json(error.message));
});

module.exports = router;
