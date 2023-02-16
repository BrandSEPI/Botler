const Discord = require("discord.js");
const playerMessage = require("../components/playerMessage");
const fs = require("fs");
let json = require("../data.json");

module.exports = {
  name: "init",
  description: "initialise le player le channel utilisé par le bot",
  permission: null,
  dm: false,
  async run(bot, message) {
    let newData = { channelId: message.channelId };
    fs.writeFile("data.json", JSON.stringify(newData), function (err) {
      if (err) throw err;
    });
    message.channel.setTopic(
      `utilise /play < Your song > pour ajouter une musique a la queue.\nLes bouttons sont utilisables`
    );
    message.channel.send(playerMessage()).then((responseMessage) => {
      let newData = json;
      newData = {
        channelId: message.channelId,
        messageId: responseMessage.id,
      };
      mainMessage = responseMessage;
      fs.writeFile("data.json", JSON.stringify(newData), function (err) {
        if (err) throw err;
      });
      setTimeout(() => {
        message.delete();
      }, 2000);
    });
  },
};
