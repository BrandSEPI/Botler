const Discord = require("discord.js");
const logger = require("../components/logger");

module.exports = async (bot, interaction) => {
  try {
    if (interaction.type === Discord.InteractionType.ApplicationCommand) {
      logger.info({
        message: `${interaction.user.username}: ${interaction.commandName}`,
      });

      let command = require(`../commands/${interaction.commandName}`);
      command.run(bot, interaction, interaction.options);
    }
  } catch (error) {
    logger.error({
      message: `${error}`,
    });
  }
};
