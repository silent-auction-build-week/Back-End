const express = require("express");

const Auction = require('../auctions/auctModel');
const Bid = require("./bidModel");
const router = express.Router();

router.get("/:id", (req,res) => {
    Bid.getBid(req.params.id)
      .then(bid => {
        if (bid) {
          bid.created_at = new Date(bid.created_at);
          res.status(201).json(bid);
        } else {
          res.status(404).json({message: "Cannot find bid with specified ID."});
        }
      })
      .catch(err => res.status(500).json({message: "Error retrieving from database"}));
  });

  router.post("/:auction_id", [isBuyer, validateBid, findAuction, validDate, validPrice] , (req,res) => {
    req.bid = {...bid, user_id: req.decoded.subject, auction_id: req.params.auction_id, created_at: new Date()}
    Bid.add(req.bid)
      .then(id => res.status(201).json(id[0]))
      .catch(err => res.status(500).json({message: "Error adding to database"}))
  });

  router.put("/:id", [authOwner, isLastBid, validateBid, findAuction, validDate, validPrice], (req,res) => {
    const {id, auction_id, user_id, ...rest} = req.body;
    req.body = rest;
    req.body.created_at = new Date();
    Bid.edit(req.params.id, req.body)
      .then(records => res.status(201).json({records}))
      .catch(err => res.status(500).json({message: "Error updating database"}))
  });

  router.delete("/:id", [authOwner, isLastBid, findAuction, validDate], (req,res) => {
    Bid.remove(req.params.id)
    .then(records => res.status(201).json({records}))
    .catch(err => res.status(500).json({message: "Error deleting from database"}))
  })

function isBuyer(req,res,next) {
    if (!req.decoded.seller) {
      next();    
    } else {
      res.status(403).json({message: "You are unauthorized to perform this action."})
    }
  }
  
  function authOwner(req,res,next) {
    Bid.getBid(req.params.id)
      .then(bid => {
        if (bid) {
          if (bid.user_id === req.decoded.subject) {
            req.bid = bid;
            next();
          } else {
            res.status(403).json({message: "You are unauthorized to perform this action."});
          }
        } else {
          res.status(400).json({message: "Bid with specified ID does not exist."})
        }
      })
  }
  
  function validateBid(req, res, next) {
    const bid = req.body;
    if (bid) {
      if (bid.price) {
        req.bid = {...req.bid, ...bid};
        next();
      } else {
        res.status(400).json({message: "Price is required."})
      }
    } else {
      res.status(400).json({message: "Body is required."})
    }
  }
  
  function findAuction(req, res, next) {
    Auction.getAuction(req.params.auction_id || req.bid.auction_id)
      .then(auction => {
        if (auction) {
          req.auction = auction;
          next();
        } else {
          res.status(404).json({message: "Cannot find auction with specified ID."});
        }
      })
  }
  
  function validDate(req, res, next) {
    let date = new Date().getTime();
    let date_ending = new Date(req.auction.date_ending).getTime();
    if (date < date_ending) {
      next();
    } else {
        res.status(400).json({message: "Auction is already over."})
    }
  }
  
  function validPrice(req, res, next) {
    Auction.getHighestBid(req.auction.id)
      .then(auction => {
        if (auction.price < req.bid.price) {
          next();
        } else {
          res.status(400).json({message: "You cannot bid lower than the current price."})
        }
      })
      .catch(err => res.status(500).json({message: "Error retrieving from the database."}))
  }
  
  function isLastBid(req,res,next) {
    Bid.getLastBid(req.bid.auction_id)
      .then(lastBid => {
        if (lastBid.id == req.params.id) {
          next();
        } else {
          res.status(403).json({mesesage: "Cannot modify bid."})
        }
      })
  }
  
  module.exports = router;