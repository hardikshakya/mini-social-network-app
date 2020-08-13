const l10n = require("jm-ez-l10n");
const jwt = require("jsonwebtoken");

const postService = require("./postService");
const logger = require("../../../lib/logger");
const {
    STANDARD,
    ERROR401,
    ERROR404,
    ERROR500,
} = require("../../../constants/common");

const postCtr = {};

postCtr.postCreate = async (req, res) => {
    try {
        const url = req.protocol + "://" + req.get("host");
        const filename = req.file.filename;
        const token =
            req.headers["x-access-token"] || req.headers.authorization;
        const userData = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const data = await postService.postCreate(
            req.body,
            userData.userId,
            url,
            filename
        );

        return res.status(STANDARD.CREATED).json({
            message: l10n.t("POST_CREATE_DONE"),
            data,
            code: STANDARD.CREATED,
        });
    } catch (error) {
        logger.error("[ERROR] From Main post-create API catch", error);
        return res.status(ERROR500.CODE).json({
            error: l10n.t("ERR_POST_CREATE"),
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
        const token =
            req.headers["x-access-token"] || req.headers.authorization;
        const userData = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const data = await postService.postUpdate(
            reqObj,
            userData.userId,
            req.params.id,
            imageUpdated
        );

        if (data.nModified > 0) {
            return res.status(STANDARD.SUCCESS).json({
                message: l10n.t("POST_UPDATE_DONE"),
                code: STANDARD.SUCCESS,
            });
        } else {
            return res.status(ERROR401.CODE).json({
                error: ERROR401.MESSAGE,
                code: ERROR401.CODE,
            });
        }
    } catch (error) {
        logger.error("[ERROR] From Main post-update API catch", error);
        return res.status(ERROR500.CODE).json({
            error: l10n.t("ERR_POST_UPDATE"),
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
            error: l10n.t("ERR_FETCH_LISTS"),
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
            error: l10n.t("ERR_POST_PROFILE"),
            code: ERROR500.CODE,
        });
    }
};

postCtr.postDelete = async (req, res) => {
    try {
        const token =
            req.headers["x-access-token"] || req.headers.authorization;
        const userData = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const data = await postService.postDelete(
            req.params.id,
            userData.userId
        );

        if (data.n > 0) {
            return res.status(STANDARD.SUCCESS).json({
                message: l10n.t("POST_DELETE_DONE"),
                code: STANDARD.SUCCESS,
            });
        } else {
            return res.status(ERROR401.CODE).json({
                error: ERROR401.MESSAGE,
                code: ERROR401.CODE,
            });
        }
    } catch (error) {
        logger.error("[ERROR] From Main post-delete API catch", error);
        return res.status(ERROR500.CODE).json({
            error: l10n.t("ERR_POST_DELETE"),
            code: ERROR500.CODE,
        });
    }
};

module.exports = postCtr;
