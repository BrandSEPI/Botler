const logger = require("../components/logger");
let json = require("./data.json");

module.exports = function updatePlayer(queue, moreData = {}) {
  try {
    setTimeout(() => {
      const mainMessage = json.messageId;
      if (typeof mainMessage == "undefined")
        throw new Error("the player message is not defined");
      if (queue == "default") {
        mainMessage.edit(playerMessage("-", {}, {}, 0)).then(() => {});
      } else {
        mainMessage
          .edit(
            playerMessage(
              client.ws.ping,
              queue.nowPlaying,
              moreData,
              queue.songs.length
            )
          )
          .then(() => {});
      }
    }, "1000");
    logger.info({
      message: `updatePlayer function was called`,
    });
  } catch (error) {
    logger.error({
      message: `${error}`,
    });
  }
};
