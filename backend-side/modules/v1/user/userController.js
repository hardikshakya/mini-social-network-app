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
        let token = "";

        if (data) {
            token = jwt.sign(
                {
                    email: data.email,
                    userId: data._id,
                },
                process.env.JWT_SECRET_KEY,
                {
                    expiresIn: "1h",
                }
            );
            delete data.password;
        }

        return res.status(STANDARD.SUCCESS).json({
            message: l10n.t("MSG_SIGNUP_SUCCESS"),
            token,
            expiresIn: 3600,
            code: STANDARD.SUCCESS,
        });
    } catch (error) {
        logger.error("[ERROR] From Main signUp API catch", error);
        return res.status(ERROR500.CODE).json({
            error: ERROR500.MESSAGE,
            code: ERROR500.CODE,
        });
    }
};

userCtr.logIn = async (req, res) => {
    try {
        const { password } = req.body;
        const validPassword = await bcrypt.compare(
            password,
            req.authUserDetails.password
        );
        if (!validPassword) {
            return res.status(ERROR403.CODE).json({
                error: l10n.t("ERR_PASSWORD_IS_NOT_MATCHED"),
                code: ERROR403.CODE,
            });
        }
        const token = jwt.sign(
            {
                email: req.authUserDetails.email,
                userId: req.authUserDetails._id,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "1h",
            }
        );

        delete req.authUserDetails.password;

        return res.status(STANDARD.SUCCESS).json({
            message: l10n.t("MSG_LOGIN_SUCCESS"),
            // data: req.authUserDetails || [],
            token,
            expiresIn: 3600,
            data: req.authUserDetails._id,
            code: STANDARD.SUCCESS,
        });
    } catch (error) {
        logger.error("[ERROR] From Main logIn API catch", error);
        return res.status(ERROR500.CODE).json({
            error: ERROR500.MESSAGE,
            code: ERROR500.CODE,
        });
    }
};

module.exports = userCtr;
