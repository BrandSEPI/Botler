const updatePlayer = require("../../functions/updatePlayer");
const logger = require("../../components/logger");

module.exports = async (bot, interaction) => {
  try {
    updatePlayer(bot, interaction, "default");
    logger.info({
      message: `queue ended`,
    });
  } catch (error) {
    logger.error({
      message: `${error}`,
    });
  }
};
