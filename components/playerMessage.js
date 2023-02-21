const { EmbedBuilder, ButtonStyle } = require("discord.js");

const btn = require("./button");

let messageStructure = (ping = 0, songData = {}, queueLength = 0) => {
  return (
    new EmbedBuilder()
      .setColor(0x00ff00)
      .setTitle(title(songData))
      .setDescription(songVerifier(songData))
      .setImage(songPicture(songData))
      .setFooter({
        text: `Remain ${queueLength} song${
          queueLength > 1 ? "s" : ""
        }\n\nLatency: ${ping} ms`,
      })
  );
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
    return "µplay < Your Song > to listen music";
  else
    return `${songData.name} _by_ ***${songData.author}*** [${songData.duration}]`;
};

let playerBtn = {
  play: ["▶", ButtonStyle.Success],
  pause: ["❚❚", ButtonStyle.Secondary],
  stop: ["∎", ButtonStyle.Secondary],
  skip: [">>|", ButtonStyle.Secondary],
};

let playerToolBtn = {
  // loop: ["⭮", ButtonStyle.Secondary],
  // shuffle: ["⤮", ButtonStyle.Secondary],
  queue: ["Show Queue", ButtonStyle.Secondary],
};

let queueModule = (moreData) => {
  let result = "";
  if (
    typeof moreData.showQueue == "undefined" ||
    typeof moreData.songs == "undefined" ||
    moreData.showQueue == false
  )
    return result;
  result = "__***Queue :***__\n";
  moreData.songs.forEach((element) => {
    result += `[${element.duration}] ⟹ ${element.name} - ${element.author}\n`;
  });
  return result;
};

module.exports = function playerMessage(
  ping = "-",
  songData = {},
  moreData = {},
  queueLength
) {
  return {
    embeds: [messageStructure(ping, songData, queueLength)],
    components: [btn(playerBtn), btn(playerToolBtn)],
    content: `${queueModule(moreData)}`,
  };
};
