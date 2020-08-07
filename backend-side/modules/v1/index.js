const express = require("express");
const path = require("path");
const logger = require("../../lib/logger");
const { ERROR400 } = require("../../constants/common");

const router = express.Router();
const apiVersion = path.basename(__filename, ".js");

router.use((req, res, next) => {
    req.apiVersion = apiVersion;
    return next();
});

// Routes
router.use("/", require("./home/homeRoute"));

router.all("/*", (req, res) => {
    logger.info("ERROR LOG");
    return res.status(ERROR400.CODE).json({
        error: req.t(ERROR400.MESSAGE),
        code: ERROR400.CODE,
    });
});

module.exports = router;
