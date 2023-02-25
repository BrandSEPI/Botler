const { ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");

module.exports = function queueMessage(queue) {
  let queueSongs = [];
  let placeHolder = "";
  try {
    queue.songs.map((song, i) => {
      if (i < 25) {
        let result = {};
        result["label"] = `${i + 1}. ${song.name}`.substring(0, 100);
        result["description"] = ` [${song.duration}]`;
        result["value"] = ` [${i}]`;
        queueSongs.push(result);
      }
    });

    placeHolder = `see next ${queueSongs.length} songs`;
  } catch (error) {
    queueSongs = {
      label: "No song Provided ",
      description: "use /play <song> to play a song",
      value: "No song Provided",
    };
    placeHolder = "No songs";
  }
  return new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId("select")
      .setPlaceholder(placeHolder)
      .addOptions(queueSongs)
  );
};
