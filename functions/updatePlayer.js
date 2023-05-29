const logger = require("../components/logger");
const playerMessage = require("../components/playerMessage");
const { useQueue } = require("discord-player");

module.exports = function updatePlayer(bot, interaction, status = "default") {
  try {
    bot.channels.cache
      .get(bot.informations.channelId)
      .messages.fetch(bot.informations.messageId)
      .then((response) => {
        const mainMessage = response;
        let queue = useQueue(interaction.guild.id);
        if (typeof mainMessage == "undefined")
          throw new Error("the player message is not defined");
        if (status == "default") {
          mainMessage.edit(playerMessage("-", {}, 0)).then(() => {});
        } else {
          mainMessage
            .edit(
              playerMessage(
                bot.ws.ping,
                queue.currentTrack,
                queue.tracks.toArray()
              )
            )
            .then(() => {});
        }
      });
  } catch (error) {
    logger.error({
      message: `${error}`,
    });
  }
};
