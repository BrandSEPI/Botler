module.exports = {
  name: "play",
  async run(bot, interaction) {
    let queue = bot.player.getQueue(interaction.guild.id);
    queue.setPaused(false);
  },
};
