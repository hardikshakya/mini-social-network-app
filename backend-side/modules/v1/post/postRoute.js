const express = require("express");
const postCtr = require("./postController");
const postMiddleware = require("./postMiddleware");
const { validationHandler } = require("../../../helper/validate");

const postRouter = express.Router();

// Post Create
const postCreateMiddleware = [
    postMiddleware.postCreateValidator(),
    validationHandler,
    postCtr.postCreate,
];
postRouter.post("/post-create", postCreateMiddleware);

// Post List
const postListMiddleware = [postCtr.postList];
postRouter.get("/post-list", postListMiddleware);

// Post Delete
const postDeleteMiddleware = [
    postMiddleware.postDeleteValidator(),
    validationHandler,
    postCtr.postDelete,
];
postRouter.delete("/post-delete/:id", postDeleteMiddleware);

module.exports = postRouter;
