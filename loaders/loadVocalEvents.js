const fs = require("fs");
// TO DO
module.exports = async (bot) => {
  fs.readdirSync("./Events/vocal")
    .filter((f) => f.endsWith(".js"))
    .forEach(async (file) => {
      let event = require(`../Events/bot/${file}`);
      bot.on(file.split(".js").join(""), event.bind(null, bot));
      console.log(`Event : ${file} loaded`);
    });
};
