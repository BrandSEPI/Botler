const gameMessage = require("../../components/gameMessage");

module.exports = {
  name: "lupus",
  description: "lancer une partie de loup garou",
  permission: null,
  dm: true,
  async run(bot, interaction) {
    interaction.deferReply().then(async () => {
      try {
        interaction.editReply(
          gameMessage({
            name: "Loup Garou",
            picture: "https://i.imgur.com/AVegihN.png",
            create: interaction.user,
          })
        );
      } catch (error) {
        interaction.editReply(`can't launch a game : ${error}`).then(() => {
          setTimeout(() => {
            interaction.deleteReply();
          }, 2000);
        });
        // throw new Error("Interaction reply failed");
      }
    });
  },
};
