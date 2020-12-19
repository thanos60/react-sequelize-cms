const passport = require('passport')
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const User = require('../models/user')

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY
}

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then(user => done(null, user))
    .catch(err => console.log(err))
})

module.exports = passport => {
  passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
    User.findByPk(jwt_payload.id)
      .then(user => {
        if (user) return done(null, user)
        return done(null, false)
      })
      .catch(err => console.error(err))
  }))
}
