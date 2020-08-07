const winston = require("winston");
const moment = require("moment");

const timestampFormat = () => {
    return moment().format("YYYY-MM-DD hh:mm:ss");
};

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            timestamp: timestampFormat,
            colorize: true,
            prettyPrint: true,
            level: "info",
        }),
    ],
});

module.exports = logger;
