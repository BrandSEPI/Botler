const updatePlayer = require("../../functions/updatePlayer");
const logger = require("../../components/logger");

module.exports = async (bot, interaction) => {
  try {
    updatePlayer(bot, interaction, "next");
    logger.info({
      message: `Player : play a song`,
    });
  } catch (error) {
    logger.error({
      message: `${error}`,
    });
  }
};
