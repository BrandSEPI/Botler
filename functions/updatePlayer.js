const logger = require("../components/logger");
const playerMessage = require("../components/playerMessage");
let json = require("../data.json");

module.exports = function updatePlayer(bot, interaction, status = "default") {
  try {
    bot.channels.cache
      .get(json.channelId)
      .messages.fetch(json.messageId)
      .then((response) => {
        const mainMessage = response;
        let queue = bot.player.getQueue(interaction.guild.id);
        if (typeof mainMessage == "undefined")
          throw new Error("the player message is not defined");
        if (status == "default") {
          mainMessage.edit(playerMessage("-", {}, 0)).then(() => {});
        } else {
          mainMessage
            .edit(playerMessage(bot.ws.ping, queue.nowPlaying, queue))
            .then(() => {});
        }
      });
  } catch (error) {
    logger.error({
      message: `${error}`,
    });
  }
};
