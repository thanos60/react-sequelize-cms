const express = require("express")
const router = express.Router()
const Post = require("../../models/post")
const passport = require('passport')

router.get(
  "/",
  // passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const posts = await Post.findAll()
      if (!posts) return res.status(400).json({ msg: "No posts found." })
      res.json(posts)
    } catch (err) {
      console.error(err.message)
      res.status(500).send("Server Error")
    }
  }
)

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { title, content } = req.body
    try {
      const post = await Post.create({
        title, content
      })
      await post.save()
      res.json(post)
    } catch (err) {
      console.error(err.message)
      res.status(500).send("Server Error")
    }
  })

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const post = await Post.findOne({ where: { id: req.params.id } })
      await post.destroy({ force: true })
      res.json(post)
    } catch (err) {
      console.error(err.message)
      res.status(500).send("Server Error")
    }
  })

module.exports = router
