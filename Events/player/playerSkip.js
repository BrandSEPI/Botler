const updatePlayer = require("../../functions/updatePlayer");
const logger = require("../../components/logger");

module.exports = async (bot, interaction) => {
  try {
    setTimeout(() => {
      updatePlayer(bot, interaction, "next");
    }, 1000);
  } catch (error) {
    logger.error({
      message: `${error}`,
    });
  }
};
