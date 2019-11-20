const dBase = require('../../data/dbConfig.js')

module.exports = {
    getAllBids,
    getBidById,
    getLatestBid,
    addNewBid,
    editBid,
    deleteBid
}

function getAllBids() {
    return dBase('auct_bid')
    .where({id})
    .first();
}

function getBidById(auct_id) {
    return dBase('auct_bid as bid')
    .where([auct_id])
    .orderBy('bid')
    .join('user as u', 'u.id', 'bid.user_id')
    .select('bid.id', 'u.username', 'u.first_name', 'bid.price', 'bid.created_on')
}

function getLatestBid(auct_id) {
    return dBase('auct_bid')
    .where({auct_id})
    .orderBy('price', 'desc')
    .first()
}

function addNewBid(bid) {
    return dBase('auct_bid').insert(bid, ['id'])
}

function editBid(id, bid) {
    return dBase('auct_bid').where({id}).update({price: bid.price, created_on: bid.created_on})
}

function deleteBid(id) {
    return dBase('auct_bid')
    .where({id})
    .delete();
}