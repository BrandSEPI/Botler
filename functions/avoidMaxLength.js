const logger = require("../components/logger");

module.exports = async function avoidMaxLength(interaction, message) {
  try {
    if (message.length <= 2000) {
      await interaction.editReply(message);
    } else {
      const coef = Math.ceil(message.length / 2000);
      let startValue = 0;
      let endValue = 2000;
      let replyMessage = await interaction.editReply(
        message.slice(startValue, endValue)
      );
      for (let index = 1; index < coef; index++) {
        startValue = endValue;
        endValue = startValue + 2000;
        await replyMessage.reply(message.slice(startValue, endValue));
      }
    }
  } catch (error) {
    logger.error({
      message: `${error}`,
    });
  }
};