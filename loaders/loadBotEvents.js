const fs = require("fs");

module.exports = async (bot) => {
  fs.readdirSync("./Events/bot")
    .filter((f) => f.endsWith(".js"))
    .forEach(async (file) => {
      let event = require(`../Events/bot/${file}`);
      bot.on(file.split(".js").join(""), event.bind(null, bot));
      console.log(`Event : ${file} loaded`);
    });
};
