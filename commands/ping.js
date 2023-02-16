const Discord = require("discord.js");

module.exports = {
  name: "ping",
  description: "affiche la latence du bot en ms",
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
