const updatePlayer = require("../../functions/updatePlayer");
const logger = require("../../components/logger");

module.exports = async (bot, interaction) => {
  try {
    updatePlayer(bot, interaction, "next");

  } catch (error) {
    logger.error({
      message: `${error}`,
    });
  }
};
