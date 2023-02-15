const Discord = require("discord.js");

module.exports = {
  name: "ping",
  description: "affiche la latence entre le bot et le serveur",
  permission: null,
  dm: true,
  async run(bot, message) {
    
    // try {
    //   logger.info({
    //     message: `${message.author.username}: send Ping`,
    //   });
    message.reply(`pong : ${bot.ws.ping} ms`).then((reply) => {
      setTimeout(() => {
        message.delete();
        reply.delete();
      }, 2000);
    });
    // } catch (error) {
    //   logger.error({
    //     message: `${error}`,
    //   });
    // }
  },
};
