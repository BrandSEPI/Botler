const { useQueue, GuildQueuePlayerNode } = require("discord-player");

module.exports = {
  name: "stop",
  async run(bot, interaction) {
    try {
      new GuildQueuePlayerNode(useQueue(interaction.guild.id)).stop(true);
    } catch (error) {
      console.log(error);
    }
  },
};
