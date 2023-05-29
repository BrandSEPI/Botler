const updatePlayer = require("../../functions/updatePlayer");
const logger = require("../../components/logger");

module.exports = async (bot, interaction) => {
  try {
    interaction.editReply(`can't add song : ${error}`).then(() => {
      setTimeout(() => {
        interaction.deleteReply();
      }, 2000);
    });
  } catch (error) {
    logger.error({
      message: `${error}`,
    });
  }
};
