const logger = require("../../../lib/logger");
const { STANDARD, ERROR500 } = require("../../../constants/common");

const homeCtr = {};

homeCtr.helloMsg = (req, res) => {
    try {
        return res.status(STANDARD.SUCCESS).json({
            message: req.t("SUCCESS"),
            data: "Welcome to mini social networking app!",
            code: STANDARD.SUCCESS,
        });
    } catch (error) {
        logger.error("[ERROR] From Main home API catch", error);
        return res.status(ERROR500.CODE).json({
            error: req.t("TRY_AGAIN"),
            code: ERROR500.CODE,
        });
    }
};

module.exports = homeCtr;
