const Discord = require("discord.js");
const logger = require("../../components/logger");
const json = require("../../data.json");

module.exports = async (bot, interaction) => {
  console.log(interaction);
  try {
    if (
      interaction.channelId === json.channelId &&
      interaction.author.bot == false
    ) {
      interaction
        .reply({
          content: "You can't send message to this Channel",
          ephemeral: true,
        })
        .then((msg) => {
          setTimeout(() => {
            msg.delete();
            interaction.delete();
          }, 2000);
        });
    }
  } catch (error) {
    logger.error({
      message: `${error}`,
    });
  }
};
