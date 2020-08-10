const logger = require("../../../lib/logger");
const Post = require("../../../models/post");

const postService = {};

postService.postCreate = async (data) => {
    try {
        const url = req.protocol + "://" + req.get("host");
        const post = new Post({
            title: data.title,
            content: data.content,
            imagePath: url + "/images/" + req.file.filename,
        });
        const result = await post.save();
        const resData = {
            ...result,
            id: result._id,
        };
        return resData;
    } catch (error) {
        logger.error("[ERROR] From postList in postService", error);
        throw new Error(error);
    }
};

postService.postUpdate = async (data, postId) => {
    try {
        const post = new Post({
            _id: postId,
            title: data.title,
            content: data.content,
        });
        const result = await Post.updateOne({ _id: postId }, post);

        return result || null;
    } catch (error) {
        logger.error("[ERROR] From postUpdate in postService", error);
        throw new Error(error);
    }
};

postService.postProfile = async (postId) => {
    try {
        const result = await Post.findById(postId);

        return result || null;
    } catch (error) {
        logger.error("[ERROR] From postProfile in postService", error);
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
