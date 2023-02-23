const Discord = require("discord.js");
const logger = require("../../components/logger");
const json = require("../../data.json");

module.exports = async (bot, interaction) => {
  try {
    if (interaction.type === Discord.InteractionType.ApplicationCommand) {
      logger.info({
        message: `${interaction.user.username}: ${interaction.commandName}`,
      });
      let command = require(`../../commands/slashCommands/${interaction.commandName}`);
      command.run(bot, interaction, interaction.options);
    } else if (interaction.isButton()) {
      logger.info({
        message: `${interaction.user.username}: clicked ${interaction.customId}`,
      });
      let command = require(`../../commands/buttonsCommands/${interaction.customId}`);
      command.run(bot, interaction);
      interaction.deferUpdate();
    } else if (interaction.channelId === json.channelId) {
      interaction
        .reply({
          content: "You can't send message to this Channel",
          ephemeral: true,
        })
        .then((msg) => {
          setTimeout(() => {
            msg.deleteReply();
          }, 2000);
        });
    }
  } catch (error) {
    logger.error({
      message: `${error}`,
    });
  }
};
