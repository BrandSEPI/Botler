const fs = require("fs");

module.exports = {
  name: "help",
  description: "liste les commandes",
  permission: null,
  dm: true,
  async run(bot, interaction) {
    try {
      await interaction.deferReply();

      fs.readdir(`./commands/slashCommands`, async (err, files) => {
        if (err) {
          console.error("Error reading the directory:", err);
          return;
        }

        const commands = [];

        files.forEach((file) => {
          if (file !== "help.js" && file !== "commandsDesac") {
            const command = require(`../slashCommands/${file}`);
            commands.push(`**/${command.name}** : ${command.description}`);
          }
        });

        await interaction.editReply({
          content: commands.join("\n"),
        });
      });
    } catch (error) {
      console.error("Error processing the command:", error);
    }
  },
};
