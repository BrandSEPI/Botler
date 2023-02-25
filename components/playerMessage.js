const { EmbedBuilder, ButtonStyle } = require("discord.js");

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
      }${
        queueLength(queue) >= 1
          ? `\n for a duration of: ${queueDuration(queue)}`
          : ""
      }\n\nLatency: ${ping} ms`,
    });
};

let title = (songData) => {
  if (Object.keys(songData).length < 1) return "__No music__";
  else return "__Current Playing__";
};
let songPicture = (songData) => {
  if (typeof songData.thumbnail != "undefined") return songData.thumbnail;
  else return "https://i.imgur.com/Pgw1Bs5.png";
};
let songVerifier = (songData) => {
  if (Object.keys(songData).length < 1)
    return "/play < Your Song > to listen music";
  else
    return `${songData.name} _by_ ***${songData.author}*** [${songData.duration}]`;
};

let playerBtn = {
  play: ["▶", ButtonStyle.Success],
  pause: ["❚❚", ButtonStyle.Secondary],
  stop: ["∎", ButtonStyle.Secondary],
  skip: [">>|", ButtonStyle.Secondary],
};

// let playerToolBtn = {
//   // loop: ["⭮", ButtonStyle.Secondary],
//   // shuffle: ["⤮", ButtonStyle.Secondary],
// };

let queueLength = (queue) => {
  try {
    return queue.songs.length;
  } catch (error) {
    return 0;
  }
};

let queueDuration = (queue) => {
  try {
    let duration = { hours: 0, minutes: 0, seconds: 0 };

    queue.songs.map((songs) => {
      let songDuration = songs.duration.split(":");
      duration.minutes += Number(songDuration[0]);
      duration.seconds += Number(songDuration[1]);
      if (duration.seconds > 60) {
        duration.minutes += 1;
        duration.seconds -= 60;
      }
      if (duration.minutes > 60) {
        duration.hours += 1;
        duration.minutes -= 60;
      }
    });

    return `${duration.hours}h ${duration.minutes}m ${duration.seconds}s`;
  } catch (error) {
    return "";
  }
};

module.exports = function playerMessage(ping = "-", songData = {}, queue) {
  try {
    return {
      embeds: [messageStructure(ping, songData, queue)],
      components: [btn(playerBtn), queueMessage(queue)],
    };
  } catch (error) {
    console.log(error);
  }
};
