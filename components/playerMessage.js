const { EmbedBuilder, ButtonStyle } = require("discord.js");
const btn = require("./button");
let number = 0;

let messageStructure = (ping = 0, songData = {}) => {
  return (
    new EmbedBuilder()
      .setColor(0x00ff00)
      // .setAuthor({
      //   name: "PIWO player",
      // })
      .setTitle("__Current Playing__")
      .setDescription(songVerifier(songData))
      .setImage(songPicture(songData))
      .setFooter({
        text: `Remain ${number} song${
          number > 1 ? "s" : ""
        }\n\n\nLatency: ${ping} ms`,
      })
  );
};
let songPicture = (songData) => {
  if (typeof songData.thumbnail != "undefined") return songData.thumbnail;
  else return "https://i.imgur.com/Pgw1Bs5.png";
};
let songVerifier = (songData) => {
  if (Object.keys(songData).length < 1) return "No information about this song";
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
  moreData = {}
) {
  return {
    embeds: [messageStructure(ping, songData)],
    components: [btn(playerBtn), btn(playerToolBtn)],
    content: `${queueModule(moreData)}`,
  };
};
