const { EmbedBuilder } = require("discord.js");

let messageStructure = (stats) => {
  return new EmbedBuilder()
    .setColor(0x007fc4)
    .setTitle(`classement: ${stats.title} ${unitByTitle(stats.title)}`)
    .setDescription(`${leaderboard(stats.values, stats.sort)}`);
};

let leaderboard = (playersArray, sort) => {
  // Sort the playersArray based on the value property in ascending order
  if (sort == "asc") playersArray.sort((a, b) => a.value - b.value);
  else if (sort == "desc") playersArray.sort((a, b) => b.value - a.value);

  // Map the playersArray entries to strings in the format "entry index: entry value"
  const entryStrings = playersArray.map(
    (entry, index) => `${index}. ${entry.username} :${entry.value}`
  );
  // Return the joined string of entryStrings using newline separator
  return entryStrings.join(`\n`);
};

const unitByTitle = (title) => {
  if (["distance", "mine"].includes(title)) {
    return "(blocks)";
  } else if (["time"].includes(title)) {
    return "(heures)";
  } else if (["craft"].includes(title)) {
    return "(items)";
  } else return "";
};
module.exports = function statMessage(stats) {
  try {
    return {
      embeds: [messageStructure(stats)],
    };
  } catch (error) {
    console.log(error);
  }
};
