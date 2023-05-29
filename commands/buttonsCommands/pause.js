const { useQueue, GuildQueuePlayerNode } = require("discord-player");

module.exports = {
  name: "pause",
  async run(bot, interaction) {
    try {
      // const queue = useQueue(interaction.guild.id);
      new GuildQueuePlayerNode(useQueue(interaction.guild.id)).pause();
      // bot.player.pause;
    } catch (error) {
      console.log(error);
    }
  },
};
