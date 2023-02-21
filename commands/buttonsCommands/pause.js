module.exports = {
  name: "pause",
  async run(bot, interaction) {
    let queue = bot.player.getQueue(interaction.guild.id);
    queue.setPaused(true);
  },
};
