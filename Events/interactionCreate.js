const Discord = require("discord.js");

module.exports = async (bot, interaction) => {
  let command = require(`../commands/${interaction.content}`);
  console.log(command);
  command.run(bot, interaction, command.option);
};
