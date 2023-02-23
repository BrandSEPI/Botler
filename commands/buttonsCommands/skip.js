module.exports = {
  name: "skip",
  async run(bot, interaction) {
    try {
      let queue = bot.player.getQueue(interaction.guild.id);
      queue.skip();
    } catch (error) {
      console.log(error);
    }
  },
};
