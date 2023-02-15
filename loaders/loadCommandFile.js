// const fs = require("fs");

// module.exports = async (bot) => {
//   fs.readdirSync("./commands")
//     .filter((f) => f.endsWith(".js"))
//     .forEach(async (file) => {
//       let command = require(`../commands/${file}`);
//       if (!command.name || typeof command.name !== "string")
//         throw new TypeError(`The file ${file} need a a name property !`);
//       bot.commands.set(command.name, command);
//     });
//   // .forEach(async (file) => {
//   //   let event = require(`../events/${file}`);
//   //   bot.on(file.split(".js").join(""), event.bind(null, bot));
//   //   console.log(`Event ${file} loaded`);
//   // });
// };
