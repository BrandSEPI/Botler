const Discord = require("discord.js");

module.exports = {
  name: "ping",
  description: "affiche la latence entre le bot et le serveur",
  permission: null,
  dm: true,
  async run(bot, message) {
    message.reply(`pong : ${bot.ws.ping} ms`).then((reply) => {
      setTimeout(() => {
        message.deleteReply();
      }, 2000);
    });
  },
};
