const l10n = require("jm-ez-l10n");
const { check } = require("express-validator");

const userService = require("./userService");
const logger = require("../../../lib/logger");
const { ERROR401, ERROR409, ERROR500 } = require("../../../constants/common");

const middleware = {};

// SignUp Data Middleware
middleware.userSignUpValidator = () => {
    return [
        check("email", l10n.t("ERR_EMAIL_REQUIRED")).exists({
            checkFalsy: true,
        }),
        check("password", l10n.t("ERR_PASSWORD_REQUIRED")).exists({
            checkFalsy: true,
        }),
    ];
};

// Check if email is already exists or not
middleware.isEmailIdExistsOrNot = async (req, res, next) => {
    try {
        const data = await userService.readUserByEmailId(req.body.email);

        if (!data || !data.email) {
            return next();
        }
        if (data || data.email) {
            return res.status(ERROR409.CODE).json({
                error: l10n.t("ERR_EMAIL_ALREADY_EXIST"),
                code: ERROR500.CODE,
            });
        }
    } catch (error) {
        logger.error(
            "[ERROR] From isEmailIdExistsOrNot() in signupMiddleware catch",
            error
        );
        return res.status(ERROR500.CODE).json({
            error: ERROR500.MESSAGE,
            code: ERROR500.CODE,
        });
    }
};

// LogIn Data Middleware
middleware.userLogInValidator = () => {
    return [
        check("email", l10n.t("ERR_EMAIL_REQUIRED")).exists({
            checkFalsy: true,
        }),
        check("password", l10n.t("ERR_PASSWORD_REQUIRED")).exists({
            checkFalsy: true,
        }),
    ];
};

// Check if the user exists or not if exists then return (Find By emailId)
middleware.isUserExistsOrNot = async (req, res, next) => {
    try {
        let data = {};
        if (req.body.email) {
            data = await userService.readUserByEmailId(req.body.email);
        } else {
            data = await userService.readUserByToken(req.headers.authorization);
        }

        if (!data || !data.email) {
            return res.status(ERROR401.CODE).json({
                error: req.t("ERR_USER_NOT_FOUND"),
                code: ERROR401.CODE,
            });
        }
        if (data && data.email) {
            req.authUserDetails = data;
            return next();
        }
    } catch (error) {
        logger.error(
            "[ERROR] From isUserExistsOrNot() in loginMiddleware catch",
            error
        );
        return res.status(ERROR500.CODE).json({
            error: ERROR500.MESSAGE,
            code: ERROR500.CODE,
        });
    }
};

module.exports = middleware;
