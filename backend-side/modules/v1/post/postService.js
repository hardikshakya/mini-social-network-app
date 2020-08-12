const fs = require("fs");
const logger = require("../../../lib/logger");
const Post = require("../../../models/post");

const postService = {};

postService.postCreate = async (data, userId, url, filename) => {
    try {
        const post = new Post({
            title: data.title,
            content: data.content,
            imagePath: url + "/images/" + filename,
            creator: userId,
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

postService.postUpdate = async (data, userId, postId, imageUpdated) => {
    try {
        const post = new Post({
            _id: postId,
            title: data.title,
            content: data.content,
            imagePath: data.imagePath,
            creator: userId,
        });
        // if (imageUpdated) {
        //     const oldPostData = await Post.findById(postId);
        //     const folderPath = (oldPostData.imagePath).replace('http://localhost:3000', '../../..');
        //     fs.unlinkSync('folderPath');
        // }

        const result = await Post.updateOne(
            { _id: postId, creator: userId },
            post
        );

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

postService.postList = async (queryParams) => {
    try {
        const pagesize = +queryParams.pagesize;
        const page = +queryParams.page;
        let result = await Post.find();
        const totalPosts = result.length;

        if (pagesize && page) {
            result = await Post.find()
                .skip(pagesize * (page - 1))
                .limit(pagesize);
        }

        return {
            result: result,
            maxPosts: totalPosts,
        };
    } catch (error) {
        logger.error("[ERROR] From postList in postService", error);
        throw new Error(error);
    }
};

postService.postDelete = async (postId, userId) => {
    try {
        const result = await Post.deleteOne({ _id: postId, creator: userId });

        return result;
    } catch (error) {
        logger.error("[ERROR] From postList in postService", error);
        throw new Error(error);
    }
};

module.exports = postService;
