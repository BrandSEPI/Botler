const { EmbedBuilder, ButtonStyle } = require("discord.js");

const btn = require("./button");

let messageStructure = (game) => {
  return new EmbedBuilder()
    .setColor(0x007fc4)
    .setTitle(`${game.create.username} veux jouer au ${game.name} !`)
    .setImage(game.picture)
    .setDescription(`Cliquez sur le boutton pour rejoindre la partie`);
};

let gameBtn = {
  join: ["rejoindre", ButtonStyle.Success],
  leave: ["quitter", ButtonStyle.Danger],
};

module.exports = function gameMessage(game) {
  try {
    return {
      embeds: [messageStructure(game)],
      components: [btn(gameBtn)],
    };
  } catch (error) {
    console.log(error);
  }
};
