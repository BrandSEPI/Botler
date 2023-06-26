const { EmbedBuilder } = require("discord.js");

const btn = require("./button");
const queueMessage = require("./queue");

let messageStructure = (ping = 0, songData = {}, queue) => {
  return new EmbedBuilder()
    .setColor(0x00ff00)
    .setTitle(title(songData))
    .setDescription(songVerifier(songData))
    .setImage(songPicture(songData))
    .setFooter({
      text: `Remain ${queueLength(queue)} song${
        queueLength(queue) > 1 ? "s" : ""
      }\n\nLatency: ${ping} ms`,
    });
};

let title = (songData) => {
  if (typeof songData === null) return "__No music__";
  else return "__Current Playing__";
};
let songPicture = (songData) => {
  if (typeof songData.thumbnail != "undefined") return songData.thumbnail;
  else return "https://i.imgur.com/Pgw1Bs5.png";
};
let songVerifier = (songData) => {
  if (songData !== null && songData.title !== undefined) {
    return `${songData.title} _by_ ***${songData.author}*** [${songData.duration}]`;
  } else return "/play < Your Song > to listen music";
};

let playerBtn = {
  play: ["▶", true],
  pause: ["❚❚", false],
  stop: ["∎", false],
  skip: [">>|", false],
  // shuffle: ["⤮", false],
};

let queueLength = (queue) => {
  try {
    if (queue !== undefined && queue !== 0) return queue.length + 1;
    else return 0;
  } catch (error) {
    return 0;
  }
};

module.exports = function playerMessage(ping = "-", songData = {}, queue) {
  try {
    return {
      embeds: [messageStructure(ping, songData, queue)],
      components: [btn(playerBtn)],
      // components: [btn(playerBtn), queueMessage(queue)],
    };
  } catch (error) {
    console.log(error);
  }
};
