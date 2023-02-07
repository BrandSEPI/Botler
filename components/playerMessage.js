const { EmbedBuilder } = require("discord.js");
const btn = require("./button");
let messageStructure = (ping = 0, songData = {}) => {
  return (
    new EmbedBuilder()
      .setColor(0x00ff00)
      // .setThumbnail(songPicture(songData))
      .setAuthor({
        name: "PIWO player",
      })
      .setTitle("Current Playing")
      .setDescription(songVerifier(songData))
      .setImage(songPicture(songData))
      .setFooter({ text: `Latency: ${ping} ms` })
  );
};
let songPicture = (songData) => {
  if (typeof songData.thumbnail != "undefined") return songData.thumbnail;
  else return "https://i.imgur.com/Pgw1Bs5.png";
};
let songVerifier = (songData) => {
  if (Object.keys(songData).length < 1) return "No information about this song";
  else return `${songData.name} by ${songData.author} - [${songData.duration}]`;
};

module.exports = function playerMessage(ping = "-", songData = {}) {
  return {
    embeds: [messageStructure(ping, songData)],
    components: [btn("play"), btn("pause"), btn("stop"), btn("go")],
  };
};
