const logger = require("../../../lib/logger");
const Post = require("../../../models/post");

const postService = {};

postService.postCreate = async (data) => {
    try {
        const post = new Post({
            title: data.title,
            content: data.content,
        });
        const result = await post.save();

        return result._id;
    } catch (error) {
        logger.error("[ERROR] From postList in postService", error);
        throw new Error(error);
    }
};

postService.postList = async () => {
    try {
        const result = await Post.find();

        return result;
    } catch (error) {
        logger.error("[ERROR] From postList in postService", error);
        throw new Error(error);
    }
};

postService.postDelete = async (postId) => {
    try {
        await Post.deleteOne({ _id: postId });

        return postId;
    } catch (error) {
        logger.error("[ERROR] From postList in postService", error);
        throw new Error(error);
    }
};

module.exports = postService;
