const logger = require("../../../lib/logger");

const postService = {};

postService.postCreate = (data) => {
    try {
        const result = data;

        return result;
    } catch (error) {
        logger.error("[ERROR] From postList in postService", error);
        throw new Error(error);
    }
};

postService.postList = () => {
    try {
        const result = [
            {
                id: "1",
                title: "First Post",
                content: "First Title Data",
            },
            {
                id: "2",
                title: "Second Post",
                content: "Second Title Data",
            },
        ];

        return result;
    } catch (error) {
        logger.error("[ERROR] From postList in postService", error);
        throw new Error(error);
    }
};

module.exports = postService;
