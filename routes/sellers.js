const router = require("express").Router();

const Seller = require("../models/sellers");
const restricted = require("../middleware/restricted");

router.get("/sellers", (req, res) => {
  Seller.get()
    .then(sellers => res.status(200).json({ sellers }))
    .catch(error => res.status(500).json(error.message));
});

router.get("/sellers/:id", (req, res) => {
  const id = req.params;

  Seller.getById(id)
    .then(seller => res.status(200).json({ seller }))
    .catch(error => res.status(500).json(error.message));
});

router.delete("/sellers/:id", restricted, (req, res) => {
  const { id } = req.params;

  Seller.remove(id)
    .then(() => res.status(200).json({ message: "seller removed" }))
    .catch(error => res.status(500).json(error.message));
});

module.exports = router;
