module.exports = {
  name: "queue",
  async run(bot, interaction) {
    let queue = bot.player.getQueue(interaction.guild.id);
    queue.stop();
  },
};
