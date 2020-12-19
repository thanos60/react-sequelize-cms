const express = require("express")
const Sequelize = require('sequelize')
const passport = require("passport")
const dotenv = require("dotenv")
const cors = require("cors")
const csp = require("helmet-csp")
const posts = require("./routes/api/posts")
const users = require("./routes/api/users")
const Post = require("./models/post")
const User = require("./models/user")
dotenv.config({ path: "./.env" })

const app = express()
app.use(passport.initialize())
require("./middlewares/passport")(passport)
app.use(express.json())
app.use(cors())

app.use(
  csp({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"]
    }
  })
)

app.use("/api/users", users)
app.use("/api/posts", posts)

Post.belongsTo(User)
User.hasMany(Post, {
  foreignKey: 'userId',
  foreignKey: 'username'
})

const sequelize = new Sequelize('cms', 'root', null, {
  dialect: 'mysql',
  host: 'localhost',
})

sequelize.sync({ force: true })

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Server running on port ${port}`))
