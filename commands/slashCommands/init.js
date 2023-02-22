const playerMessage = require("../../components/playerMessage");
const fs = require("fs");
let json = require("../../data.json");

module.exports = {
  name: "init",
  description: "initialise le player le channel utilisé par le bot",
  permission: null,
  dm: false,
  async run(bot, interaction) {
    let newData = { channelId: "", messageId: "" };
    interaction.deferReply();
    fs.writeFile("data.json", JSON.stringify(newData), function (err) {
      if (err) throw err;
    });
    interaction.channel.setTopic(
      `utilise /play < musique à jouer > pour ajouter une musique a la queue.\nLes bouttons sont utilisables`
    );
    interaction.channel.send(playerMessage()).then((responseMessage) => {
      let newData = json;
      newData = {
        channelId: interaction.channelId,
        messageId: responseMessage.id,
      };
      mainMessage = responseMessage;
      fs.writeFile("data.json", JSON.stringify(newData), function (err) {
        if (err) throw err;
      });
    });
    interaction.editReply(`Initialisation...`).then((reply) => {
      setTimeout(() => {
        interaction.deleteReply();
      }, 100);
    });
  },
};
