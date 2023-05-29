const updatePlayer = require("../../components/playerMessage");
const playlist = require("../../functions/playlist");
const playerMessage = require("../../components/playerMessage");

module.exports = {
  name: "test",
  description: "pour tester",
  permission: null,
  dm: true,
  options: [
    {
      type: "boolean",
      name: "force",
      description: "forcer la réinitialisation du player",
      required: false,
    },
  ],
  async run(bot, interaction, args) {
    interaction.channel.setTopic(
      `utilise /play < musique à jouer > pour ajouter une musique a la queue.\nLes bouttons sont utilisables`
    );
    if (args.get("force") !== null && args.get("force").value === true) {
      bot.informations = undefined;
    }
    if (bot.informations === undefined) {
      interaction.channel.messages.fetch().then((messages) => {
        interaction.channel.bulkDelete(messages);
      });
      setTimeout(() => {
        interaction.channel.send(playerMessage()).then((responseMessage) => {
          bot.informations = {
            channelId: interaction.channelId,
            messageId: responseMessage.id,
          };
        });
      }, 500);
      interaction.reply(`Initialisation...`).then((reply) => {
        setTimeout(() => {
          interaction.deleteReply();
        }, 100);
      });
    } else {
      interaction.reply("le player est déjà initialisé").then((reply) => {
        setTimeout(() => {
          interaction.deleteReply();
        }, 1000);
      });
    }
  },
};
