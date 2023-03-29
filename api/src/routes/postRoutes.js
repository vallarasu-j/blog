
const express = require("express");
const { getPosts, postFeeds } = require("../controllers/posts");

var postRouter = express.Router();

postRouter.get("/posts", getPosts);
postRouter.post("/posts", postFeeds);



module.exports = postRouter;