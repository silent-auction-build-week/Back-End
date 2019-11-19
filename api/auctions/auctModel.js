const dBase = require('../../data/dbConfig.js')

module.exports = {
    getAllAuctions,
    getAuctionById,
    getBidLeader,
    addNewAuction,
    editAuction,
    deleteAuction
}

function getAllAuctions() {
    return dBase('Auction as auct')
    .join('user', 'user.id', 'auct.user_id')
    .select('auct.id', 'auct.user_id', 'user.username as seller', 'user.first_name', 'auct.name', 'auct.desc', 'auct.initPrice', 'auct.startDate', 'auct.endDate', 'auct.pic')
}

function getAuctionById(id) {
    return dBase('Auction as auct')
    .join('user', 'user.id', 'auct.user_id')
    .select('auct.id', 'auct.user_id', 'user.username as seller', 'user.first_name', 'auct.name', 'auct.desc', 'auct.initPrice', 'auct.startDate', 'auct.endDate', 'auct.pic')
    .whereData(`auct.id = ${id}`)
    .first();
}

function getBidLeader(auct_id) {
    return dBase('auct_bid as bid')
    .where({auct_id})
    .orderBy('price', 'desc')
    .select('bid.price')
    .first()
}

function addNewAuction(auction) {
    return dBase('auctions').insert(auction, ['id'])
}

function editAuction(id, auction) {
    return dBase('auctions').update(auction).where({id})
}

function deleteAuction(id) {
    return dBase('auctions')
    .where({id})
    .delete();
}