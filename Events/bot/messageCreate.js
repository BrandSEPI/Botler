const Discord = require("discord.js");
const logger = require("../../components/logger");
const json = require("../../data.json");

module.exports = async (bot, interaction) => {
  try {
    if ((interaction.type == 0) & (interaction.channelId == json.channelId)) {
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
