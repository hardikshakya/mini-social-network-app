const l10n = require("jm-ez-l10n");
const postService = require("./postService");
const logger = require("../../../lib/logger");
const { STANDARD, ERROR500 } = require("../../../constants/common");

const postCtr = {};

postCtr.postCreate = async (req, res) => {
    try {
        const data = await postService.postCreate(req.body);

        return res.status(STANDARD.CREATED).json({
            message: l10n.t("POST_CREATE_DONE"),
            data,
            code: STANDARD.CREATED,
        });
    } catch (error) {
        logger.error("[ERROR] From Main post-create API catch", error);
        return res.status(ERROR500.CODE).json({
            error: ERROR500.MESSAGE,
            code: ERROR500.CODE,
        });
    }
};

postCtr.postList = async (req, res) => {
    try {
        const data = await postService.postList();

        return res.status(STANDARD.SUCCESS).json({
            message: l10n.t("POST_LIST_DONE"),
            data,
            code: STANDARD.SUCCESS,
        });
    } catch (error) {
        logger.error("[ERROR] From Main post-list API catch", error);
        return res.status(ERROR500.CODE).json({
            error: ERROR500.MESSAGE,
            code: ERROR500.CODE,
        });
    }
};

postCtr.postDelete = async (req, res) => {
    try {
        const data = await postService.postDelete(req.params.id);

        return res.status(STANDARD.SUCCESS).json({
            message: l10n.t("POST_DELETE_DONE"),
            code: STANDARD.SUCCESS,
        });
    } catch (error) {
        logger.error("[ERROR] From Main post-delete API catch", error);
        return res.status(ERROR500.CODE).json({
            error: ERROR500.MESSAGE,
            code: ERROR500.CODE,
        });
    }
};

module.exports = postCtr;
