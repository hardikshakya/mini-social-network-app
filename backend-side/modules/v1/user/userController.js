const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const l10n = require("jm-ez-l10n");

const userService = require("./userService");
const logger = require("../../../lib/logger");
const utils = require("../../../lib/utils");
const { STANDARD, ERROR403, ERROR500 } = require("../../../constants/common");

const userCtr = {};

userCtr.signUp = async (req, res) => {
    try {
        const { password } = req.body;
        const encPassword = await utils.passwordHash(password);

        req.body.password = encPassword;

        const data = await userService.createUser(req.body);

        return res.status(STANDARD.SUCCESS).json({
            message: l10n.t("POST_LIST_DONE"),
            data,
            code: STANDARD.SUCCESS,
        });
    } catch (error) {
        logger.error("[ERROR] From Main signUp API catch", error);
        return res.status(ERROR500.CODE).json({
            error: ERROR500.MESSAGE,
            code: ERROR500.CODE,
        });
    }
}

module.exports = userCtr;
