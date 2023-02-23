module.exports = {
  name: "stop",
  async run(bot, interaction) {
    try {
      let queue = bot.player.getQueue(interaction.guild.id);
      queue.stop();
    } catch (error) {
      console.log(error);
    }
  },
};
