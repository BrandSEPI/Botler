const { createLogger, format, transports } = require("winston");

const logger = new createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({
      filename: "./logs/error.log",
      level: "error",
    }),
    new transports.File({
      level: "info",
      filename: "./logs/combined.log",
    }),
  ],
  exitOnError: false,
});

module.exports = logger;
