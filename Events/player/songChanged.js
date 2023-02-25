const updatePlayer = require("../../functions/updatePlayer");
const logger = require("../../components/logger");

module.exports = async (bot, interaction) => {
  try {
    updatePlayer(bot, interaction, "next");
    logger.info({
      // message: `${interaction.user.username} : song changed`,
      message: `${interaction} : song added`,
    });
  } catch (error) {
    logger.error({
      message: `${error}`,
    });
  }
};
