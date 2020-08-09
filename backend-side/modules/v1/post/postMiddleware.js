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

middleware.postDataValidator = () => {
    return [
        check("id", l10n.t("ERR_POST_ID_REQUIRED")).exists({
            checkFalsy: true,
        }),
    ];
};

middleware.postUpdateValidator = () => {
    return [
        check("id", l10n.t("ERR_POST_ID_REQUIRED")).exists({
            checkFalsy: true,
        }),
    ];
};

middleware.postDeleteValidator = () => {
    return [
        check("id", l10n.t("ERR_POST_ID_REQUIRED")).exists({
            checkFalsy: true,
        }),
    ];
};

module.exports = middleware;
