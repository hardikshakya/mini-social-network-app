const express = require("express");
const homeCtr = require("./homeController");

const homeRouter = express.Router();

// Welcome message
const homeMiddleware = [homeCtr.helloMsg];
homeRouter.get("/", homeMiddleware);

module.exports = homeRouter;
