module.exports = {
  name: "play",
  async run(bot, interaction) {
    try {
      let queue = bot.player.getQueue(interaction.guild.id);
      queue.setPaused(false);
    } catch (error) {
      console.log(error);
    }
  },
};
