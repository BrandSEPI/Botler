const { useQueue, GuildQueuePlayerNode } = require("discord-player");

module.exports = {
  name: "play",
  async run(bot, interaction) {
    try {
      // console.log(bot.player);
      // const queue = useQueue(interaction.guild.id);
      // console.log(queue);
      new GuildQueuePlayerNode(useQueue(interaction.guild.id)).resume();
    } catch (error) {
      console.log(error);
    }
  },
};
