module.exports = {
  name: "skip",
  async run(bot, interaction) {
    let queue = bot.player.getQueue(interaction.guild.id);
    queue.skip();
  },
};
