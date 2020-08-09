require("dotenv").config();
const mongoose = require("mongoose");
const logger = require("../lib/logger");

const initDatabase = () => {
    logger.info("Initializing database connection...");

    // Start MongoDB Connection
    mongoose
        .connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .catch((err) =>
            logger.error("ERROR while connecting to database", err)
        );

    const connection = mongoose.connection;

    connection.once("open", () => {
        logger.info("MongoDB database connected successfully!");
    });
};

module.exports = initDatabase;
