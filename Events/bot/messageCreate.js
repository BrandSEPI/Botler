const Discord = require("discord.js");
const logger = require("../../components/logger");

module.exports = async (bot, interaction) => {
  try {
    if (
      (bot.informations !== undefined) &
      (interaction.type == 0) &
      (interaction.channelId == bot.informations.channelId)
    ) {
      interaction
        .reply({ content: "use slash commands", ephemeral: true })
        .then((msg) => {
          setTimeout(() => {
            interaction.delete();
            msg.delete();
          }, 2000);
        });
    }
  } catch (error) {
    logger.error({
      message: `${error}`,
    });
  }
};
