const jwt = require("jsonwebtoken");

const logger = require("../../../lib/logger");
const User = require("../../../models/user");

const userService = {};

// Check EmailId Exists or Not
userService.readUserByEmailId = async (email) => {
    try {
        const userData = await User.findOne({
            email: email,
        });
        return userData || null;
    } catch (error) {
        logger.error("[ERROR] From readUserByEmailId in userService", error);
        throw new Error(error);
    }
};

// SignUp-Create new User
userService.createUser = async (data) => {
    try {
        const user = new User({
            email: data.email,
            password: data.password,
        });
        const result = await user.save();

        return result;
    } catch (error) {
        logger.error("[ERROR] From createUser in userService", error);
        throw new Error(error);
    }
};

// Check user exists or not with token
userService.readUserByToken = async (token) => {
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const userRes = await User.findById(user.userId);

        return userRes;
    } catch (error) {
        logger.error("[ERROR] From readUserByToken in userService", error);
        throw new Error(error.message);
    }
};

module.exports = userService;
