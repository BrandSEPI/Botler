const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

let btnInformation = {
  play: ["▶", ButtonStyle.Success],
  pause: ["||", ButtonStyle.Secondary],
  stop: ["∎", ButtonStyle.Secondary],
  go: ["Come to the channel", ButtonStyle.Secondary],
};

module.exports = function btn(index) {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(index)
      .setLabel(btnInformation[index][0])
      .setStyle(btnInformation[index][1])
  );
};
