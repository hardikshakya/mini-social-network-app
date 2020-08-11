const l10n = require("jm-ez-l10n");
const postService = require("./postService");
const logger = require("../../../lib/logger");
const { STANDARD, ERROR404, ERROR500 } = require("../../../constants/common");

const postCtr = {};

postCtr.postCreate = async (req, res) => {
    try {
        const url = req.protocol + "://" + req.get("host");
        const filename = req.file.filename;
        const data = await postService.postCreate(req.body, url, filename);

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

postCtr.postUpdate = async (req, res) => {
    try {
        const { title, content } = req.body;
        const reqObj = {
            title,
            content,
        };
        let imageUpdated = false;
        let imagePath = req.body.imagePath;
        if (req.file) {
            const url = req.protocol + "://" + req.get("host");
            imagePath = url + "/images/" + req.file.filename;
            imageUpdated = true;
        }
        reqObj.imagePath = imagePath;
        await postService.postUpdate(reqObj, req.params.id, imageUpdated);

        return res.status(STANDARD.SUCCESS).json({
            message: l10n.t("POST_UPDATE_DONE"),
            code: STANDARD.SUCCESS,
        });
    } catch (error) {
        logger.error("[ERROR] From Main post-update API catch", error);
        return res.status(ERROR500.CODE).json({
            error: ERROR500.MESSAGE,
            code: ERROR500.CODE,
        });
    }
};

postCtr.postList = async (req, res) => {
    try {
        const queryParams = req.query;
        const data = await postService.postList(queryParams);

        return res.status(STANDARD.SUCCESS).json({
            message: l10n.t("POST_LIST_DONE"),
            data: data.result,
            maxPosts: data.maxPosts,
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

postCtr.postProfile = async (req, res) => {
    try {
        const data = await postService.postProfile(req.params.id);

        if (!data) {
            return res.status(ERROR404.CODE).json({
                error: ERROR404.MESSAGE,
                code: ERROR404.CODE,
            });
        }

        return res.status(STANDARD.SUCCESS).json({
            message: l10n.t("POST_PROFILE_DONE"),
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