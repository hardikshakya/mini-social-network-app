const express = require("express");
const userCtr = require("./userController");
const userMiddleware = require("./userMiddleware");
const { validationHandler } = require("../../../helper/validate");

const userRouter = express.Router();

// User SignUp
const userSignUpMiddleware = [
    userMiddleware.userSignUpValidator(),
    validationHandler,
    userMiddleware.isEmailIdExistsOrNot,
    userCtr.signUp,
];
userRouter.post("/signup", userSignUpMiddleware);

module.exports = userRouter;
