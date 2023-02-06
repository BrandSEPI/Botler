const Discord = require("discord.js");
const client = new Discord.Client();

client.login(
  "017d1d66fd9329d53c315820b61936c9aeb40ed7890034620e683a01f65736af"
);

client.on("message", (message) => {
  if (message.content === "ping") {
    message.reply("pong");
  }
});
