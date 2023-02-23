module.exports = {
  name: "pause",
  async run(bot, interaction) {
    try {
      let queue = bot.player.getQueue(interaction.guild.id);
      queue.setPaused(true);
    } catch (error) {
      console.log(error);
    }
  },
};
