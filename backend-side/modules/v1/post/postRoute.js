const express = require("express");
const postCtr = require("./postController");
const postMiddleware = require("./postMiddleware");
const { validationHandler } = require("../../../helper/validate");
const { imageUpload } = require("../../../helper/imgUpload");
const userMiddleware = require("../user/userMiddleware");

const postRouter = express.Router();

// Post Create
const postCreateMiddleware = [
    userMiddleware.isUserExistsOrNot,
    imageUpload,
    postMiddleware.postCreateValidator(),
    validationHandler,
    postCtr.postCreate,
];
postRouter.post("/post-create", postCreateMiddleware);

// Post Update
const postUpdateMiddleware = [
    userMiddleware.isUserExistsOrNot,
    imageUpload,
    postMiddleware.postUpdateValidator(),
    validationHandler,
    postCtr.postUpdate,
];
postRouter.put("/post-update/:id", postUpdateMiddleware);

// Fetch Single Post
const postDataMiddleware = [
    postMiddleware.postDataValidator(),
    validationHandler,
    postCtr.postProfile,
];
postRouter.get("/post-data/:id", postDataMiddleware);

// Post List
const postListMiddleware = [postCtr.postList];
postRouter.get("/post-list", postListMiddleware);

// Post Delete
const postDeleteMiddleware = [
    postMiddleware.postDeleteValidator(),
    validationHandler,
    userMiddleware.isUserExistsOrNot,
    postCtr.postDelete,
];
postRouter.delete("/post-delete/:id", postDeleteMiddleware);

module.exports = postRouter;
