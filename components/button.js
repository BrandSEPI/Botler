const { info } = require("console");
const { ActionRowBuilder, ButtonBuilder } = require("discord.js");

let ButtonCreator = (information) => {
  let result = [];
  for (key in information) {
    result.push(
      new ButtonBuilder()
        .setCustomId(key)
        .setLabel(information[key][0])
        .setStyle(information[key][1])
    );
  }
  return result;
};

module.exports = function btn(information) {
  return new ActionRowBuilder().setComponents(ButtonCreator(information));
};
