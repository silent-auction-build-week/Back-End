const jwt = require("jsonwebtoken");
const secret = require("./secret");

module.exports = function generateToken(username) {
  const payload = { username };
  const options = { expiresIn: "1 week" };
  return jwt.sign(payload, secret.jwtSecret, options);
};
