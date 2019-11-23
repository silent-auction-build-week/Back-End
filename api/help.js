const jwt = require('jsonwebtoken');
const secret = require('../private');

module.exports = {
    verifyToken
}

function verifyToken (req, res, next) {
    const token = req.headers.authorization;
    jwt.verify(token, secret.jwtSecret, (error, decodedToken) => {
        if (error) {
            res.status(400).json({Denial: 'Log in is required to see this page.'})
        } else {
            req.decoded = decodedToken;
            next();
        }
    })
}