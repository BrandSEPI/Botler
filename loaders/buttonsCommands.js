const { REST } = require("@discordjs/rest");
const Discord = require("discord.js");
const { Routes } = require("discord.js");
const fs = require("fs");

module.exports = async (bot) => {
  let commandList = [];

  fs.readdirSync("./buttonsCommands")
    .filter((f) => f.endsWith(".js"))
    .forEach(async (file) => {
      let command = require(`../buttonsCommands/${file}`);
      if (!command.name || typeof command.name !== "string")
        throw new TypeError(`The file ${file} need a a name property !`);
      //       bot.commands.set(command.name, command);
      //     });
      //   bot.commands.forEach(async (command) => {
      let slashcommand = new Discord.comma
        .setName(command.name)
        .setDescription(command.description)
        .setDMPermission(command.dm)
        .setDefaultMemberPermissions(command.permission);

      if (command.options?.length >= 1) {
        for (let i = 0; i < command.options.length; i++) {
          slashcommand[
            `add${
              command.options[i].type.slice(0, 1).toUpperCase() +
              command.options[i].type.slice(1, command.options[i].type.length)
            }Option`
          ]((option) =>
            option
              .setName(command.options[i].name)
              .setDescription(command.options[i].description)
              .setRequired(command.options[i].required)
          );
        }
      }
      commandList.push(slashcommand);
    });
  console.log(`commmands loaded : ${commandList.length} `);
  const rest = new REST({ version: "10" }).setToken(bot.token);
  await rest.put(Routes.applicationCommands(bot.user.id), {
    body: commandList,
  });
};
