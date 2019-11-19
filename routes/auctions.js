const router = require("express").Router();

const restricted = require("../middleware/restricted");
const Auction = require("../models/auctions");

router.get("/auctions", (req, res) => {
  Auction.get()
    .then(auctions => res.status(200).json({ auctions }))
    .catch(error => res.status(500).json(error.message));
});

router.get("/:sellerId/auctions", (req, res) => {
  const { sellerId } = req.params;

  Auction.getBySellerId(sellerId)
    .then(auctions => res.status(200).json({ auctions }))
    .catch(error => res.status(500).json(error.message));
});

router.get("/auctions/:id", (req, res) => {
  const { id } = req.params;

  Auction.getByAuctionId(id)
    .then(auction => res.status(200).json({ auction }))
    .catch(error => res.status(500).json(error.message));
});

router.post("/:sellerId/:itemId/auctions", (req, res) => {
  const { sellerId, itemId } = req.params;
  const time = req.body;
  const { auction_start, auction_end } = time;

  if (!auction_start || !auction_end) {
    res
      .status(400)
      .json({ message: "Please fill in the required information" });
  } else {
    Auction.insert(sellerId, itemId, time)
      .then(newAuction =>
        res.status(201).json({ message: "auction created", newAuction })
      )
      .catch(error => res.status(500).json(error.message));
  }
});

router.delete("/auctions/:auctionId", (req, res) => {
  const { auctionId } = req.params;

  Auction.remove(auctionId)
    .then(() => res.status(200).json({ message: "auction removed" }))
    .catch(error => res.status(500).json(error.message));
});

module.exports = router;
