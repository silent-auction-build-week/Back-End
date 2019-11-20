const express = require("express");

const Auction = require("./auctModel");
const Bid = require("../bidding/bidModel");
const router = express.Router();

router.get("/", (req, res) => {
  Auction.getAllAuctions()
    .then(async auctions => {
      for (i = 0; i < auctions.length; i++) {
        const auction_id = auctions[i].id;
        const bids = await Bid.getBidsByAuction(auction_id);
        const bid_count = bids.length;
        auctions[i].endDate = new Date(auctions[i].endDate);
        auctions[i].startDate = new Date(auctions[i].startDate);
        auctions[i].bid_count = bid_count;
        auctions[i].current_price = bid_count
          ? bids[bid_count - 1].price
          : auctions[i].initPrice;

        auctions[i].last_bid_date = bid_count
          ? new Date(bids[bid_count - 1].created_at)
          : auctions[i].startDate;
      }
      res.status(200).json(auctions);
    })
    .catch(err =>
      res.status(500).json({ message: "Error retrieving from database." })
    );
});

router.get("/:id", (req, res) => {
  Auction.getAuctionById(req.params.id)
    .then(auction => {
      if (auction) {
        auct.startDate = new Date(auct.startDate);
        auct.endDate = new Date(auct.endDate);
        Bid.getBidsByAuction(auction.id)
          .then(bids => {
            bids.forEach(bid => {
              bid.created_at = new Date(bid.created_at);
            });
            auction.bids = bids;
            res.status(200).json(auction);
          })
          .catch(err =>
            res.status(500).json({ message: "Error retrieving from database." })
          );
      } else {
        res
          .status(400)
          .json({ message: "Cannot find auction with specified ID." });
      }
    })
    .catch(err =>
      res.status(500).json({ message: "Error retrieving from database." })
    );
});

router.post("/", [isSeller, validateAuction], (req, res) => {
  Auction.addNewAuction(req.auction)
    .then(id => res.status(201).json(id[0]))
    .catch(err =>
      res.status(500).json({ message: "Error adding to database" })
    );
});

router.put("/:id", [authOwner, validDate], (req, res) => {
  const { user_id, id, ...rest } = req.body;
  req.body = rest;
  Bid.getBidsByAuction(req.params.id)
    .then(bids => {
      if (bids.length) {
        const { starting_price, name, date_starting, ...rest } = req.body;
        req.body = rest;
      }
      Auction.edit(req.params.id, req.body)
        .then(records => res.status(201).json({ records }))
        .catch(err =>
          res.status(500).json({ message: "Error updating database" })
        );
    })
    .catch(err =>
      res.status(500).json({ message: "Error retrieving from database" })
    );
});

router.delete("/:id", [authOwner, validDate], (req, res) => {
  Bid.getBidsByAuction(req.auction.id);
  Auction.remove(req.params.id)
    .then(records => res.status(201).json({ records }))
    .catch(err =>
      res.status(500).json({ message: "Error deleting from database" })
    );
});

function isSeller(req, res, next) {
  if (req.decoded.seller) {
    next();
  } else {
    res
      .status(403)
      .json({ message: "You are unauthorized to perform this action." });
  }
}

function authOwner(req, res, next) {
  Auction.getAuction(req.params.id).then(auction => {
    if (auction) {
      if (auction.user_id === req.decoded.subject) {
        req.auction = auction;
        next();
      } else {
        res
          .status(403)
          .json({ message: "You are unauthorized to perform this action." });
      }
    } else {
      res
        .status(400)
        .json({ message: "Auction with specified ID does not exist." });
    }
  });
}

function validateAuction(req, res, next) {
  const auction = req.body;
  if (auction) {
    if (
      !auction.name ||
      !auction.starting_price ||
      !auction.date_ending ||
      !auction.image ||
      !auction.date_starting
    ) {
      res
        .status(400)
        .json({
          message:
            "Name, starting price, end date, start date, and image URL is required."
        });
    } else {
      req.auction = { ...auction, user_id: req.decoded.subject };
      next();
    }
  } else {
    res.status(400).json({ message: "Body is required." });
  }
}

function validDate(req, res, next) {
  let date = new Date().getTime();
  let date_ending = new Date(req.auction.date_ending).getTime();
  if (date < date_ending) {
    next();
  } else {
    res.status(400).json({ message: "Auction is already over." });
  }
}
module.exports = router;
