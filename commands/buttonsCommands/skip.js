const { useQueue, GuildQueuePlayerNode } = require("discord-player");

module.exports = {
  name: "skip",
  async run(bot, interaction) {
    try {
      new GuildQueuePlayerNode(useQueue(interaction.guild.id)).skip();
    } catch (error) {
      console.log(error);
    }
  },
};
