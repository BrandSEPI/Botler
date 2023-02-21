module.exports = {
  name: "ping",
  description: "affiche la latence du bot en ms",
  permission: null,
  dm: true,
  async run(bot, interaction) {
    interaction.reply(`pong : ${bot.ws.ping} ms`).then((reply) => {
      setTimeout(() => {
        interaction.deleteReply();
      }, 2000);
    });
  },
};
