const { EmbedBuilder } = require("discord.js");

let messageStructure = (stats) => {
  return new EmbedBuilder()
    .setColor(0x007fc4)
    .setTitle(`classement: ${stats.title} (${unitByTitle(stats.title)})`)
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
// const statTable = {
//     mort: "minecraft:deaths",
//   "temps de jeu": "minecraft:play_time",
//   "dégats données": "minecraft:damage_dealt",
//   "dégats reçus": "minecraft:damage_taken",
//   "mobs tués": "minecraft:mob_kills",
//   mined: "minecraftMined",
//   crafted: "minecraftCrafted",
//   // sauts: "minecraft:jump",
//   // reproduction: "minecraft:animals_bred",
//   "pêche réussie": "minecraft:fish_caught",
//   // enchantements: "minecraft:enchant_item",
//   // kills: "minecraft:player_kills",
//   // raids: "minecraft:raid_win",
//   // trades: "minecraft:traded_with_villager",
//   distance: "minecraftDistance",
// };
const unitByTitle = (title) => {
  if (["distance", "mine"].includes(title)) {
    return "blocs";
  } else if (["temps de jeu"].includes(title)) {
    return "heures";
  } else if (["craft"].includes(title)) {
    return "items";
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
