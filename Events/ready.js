const Discord = require("discord.js");
const loadSlashCommands = require("../loaders/loadSlashCommand");

module.exports = async (bot) => {
  await loadSlashCommands(bot);
  console.log(`Logged in as ${bot.user.tag}`);
};
