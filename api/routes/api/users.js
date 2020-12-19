const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { check } = require("express-validator")
const validate = require("../../middlewares/validate")
const User = require("../../models/user")

router.post(
  "/register",
  [
    check("username")
      .not()
      .isEmpty()
      .withMessage("Username is required.")
      .trim(),
    check("password")
      .not()
      .isEmpty()
      .withMessage("Password is required.")
      .trim()
  ],
  validate,
  (req, res) => {
    const { username, password } = req.body

    User.findOne({ where: { username: username } }).then(user => {
      if (user) return res.status(400)
        .json({ username: "Username already exists." })
      /*if (!user) return res.status(400)
        .json({ username: "You must be given access." })*/
      const newUser = new User({ username, password })

      bcrypt.genSalt(12, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err))
        })
      })
    })
  }
)

router.post(
  "/",
  [
    check("username")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Username is required.")
      .trim(),
    check("password").exists()
  ],
  validate,
  (req, res) => {
    const { username, password } = req.body

    User.findOne({ where: { username: username } }).then(user => {
      if (!user) return res
        .status(400)
        .json({ errors: [{ msg: "Invalid credentials." }] })

      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user.id,
            username: user.username
          };
          jwt.sign(
            payload,
            process.env.SECRET_OR_KEY,
            {
              expiresIn: 3600
            },
            (err, token) => {
              res.json({
                success: true,
                token: `Bearer ${token}`
              });
            }
          );
        } else return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials." }] })
      })
    })
  }
)

module.exports = router
