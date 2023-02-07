const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const btn = require("./button");
let messageStructure = (ping) => {
  return new EmbedBuilder()
    .setColor(0x00ff00)
    .setTitle("BOTLER:PIWO player")
    .setDescription(`Ping: ${ping}`)

    .setImage("attachment://piwoPlayer.png");
};
const file = new AttachmentBuilder("./piwoPlayer.png");

module.exports = function playerMessage(ping) {
  return {
    embeds: [messageStructure(ping)],
    components: [btn("play"), btn("pause"), btn("stop"), btn("go")],
    files: [file],
  };
};
