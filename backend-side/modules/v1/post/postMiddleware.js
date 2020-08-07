const l10n = require("jm-ez-l10n");
const { check } = require("express-validator");

const middleware = {};

middleware.postCreateValidator = () => {
    return [
        check("title", l10n.t("ERR_POST_TITLE_REQUIRED")).exists({
            checkFalsy: true,
        }),
        check("content", l10n.t("ERR_POST_CONTENT_REQUIRED")).exists({
            checkFalsy: true,
        }),
    ];
};

module.exports = middleware;
