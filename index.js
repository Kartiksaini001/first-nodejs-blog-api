const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Import models
const Post = require("./src/models/post");

// Define application
const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", function (req, res) {
  // handle the request for root route
  res.send({ ping: "pong" });
});

// Operations: Create, Read, Update, Delete (CRUD)
app.post("/posts", function (req, res) {
  // Get values from request payload
  const title = req.body.title;
  const author = req.body.author;
  const content = req.body.content;

  // Assign values to Post model
  var post = new Post();
  post.title = title;
  post.author = author;
  post.content = content;

  // Save the post
  post.save(function (error, savedPost) {
    if (error) {
      // send error response
      res.status(500).send({ error: "Unable to save Post " });
    } else {
      // send success response
      res.status(200).send(savedPost);
    }
  });
});

// Get list of all posts
app.get("/posts", function (req, res) {
  Post.find({}, function (error, posts) {
    if (error) {
      // send error response
      res.status(422).send({ error: "Unable to fetch posts" });
    } else {
      // send success response
      res.status(200).send(posts);
    }
  });
});

// Tasks for you
// 1. Create API to get details of a single Post
app.get("/posts/:id", (req, res) => {
  const { id } = req.params;

  Post.findById(id, (error, post) => {
    if (error) {
      // send error response
      res.status(422).send({ error: "Unable to fetch post" });
    } else {
      // send success response
      res.status(200).send(post);
    }
  });
});

// 2. Create API to update a Post
app.patch("/posts/:id", (req, res) => {
  const { id } = req.params;

  Post.findByIdAndUpdate(id, req.body, { new: true }, (error, post) => {
    if (error) {
      // send error response
      res.status(500).send({ error: "Unable to update post" });
    } else {
      // send success response
      res.status(200).send(post);
    }
  });
});

// 3. Create API to delete a Post
app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;

  Post.findByIdAndDelete(id, (error, post) => {
    if (error) {
      // send error response
      res.status(500).send({ error: "Unable to delete post" });
    } else {
      // send success response
      res.status(200).send(post);
    }
  });
});

// Define PORT
const PORT = process.env.PORT || 5000;

// Define DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`MongoDB Connected and server running on port: ${PORT}`);
    })
  )
  .catch((err) => {
    console.log(err.message);
  });
