const secret = require('../private');
const jwt = require('jsonwebtoken');

module.exports = {
    certifyToken
}

function certifyToken (req, res, next) {
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