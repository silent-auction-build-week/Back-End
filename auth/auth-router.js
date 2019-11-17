const router = require("express").Router();
const bcrypt = require("bcryptjs");

const User = require("./auth-models");
const generateToken = require("./generateToken");

router.post("/register/:userType", (req, res) => {
  const { userType } = req.params;
  const user = req.body;
  const token = generateToken(user.username);
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;

  User.insert(userType, user)
    .then(newUser =>
      res.status(201).json({ message: "registration success", newUser, token })
    )
    .catch(error => res.status(500).json(error.message));
});

router.post("/login/:userType", (req, res) => {
  const { userType } = req.params;
  const { username, password } = req.body;

  User.findBy(userType, { username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user.username);
        res.status(200).json({ message: "login success", token });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    })
    .catch(error => res.status(500).json(error.message));
});

module.exports = router;
