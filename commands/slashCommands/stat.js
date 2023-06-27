const fs = require("fs");
const statMessage = require("../../components/statMessage");

const statTable = {
  mort: "minecraft:deaths",
  time: "minecraft:play_time",
  "dégats données": "minecraft:damage_dealt",
  "dégats reçus": "minecraft:damage_taken",
  "mobs tués": "minecraft:mob_kills",
  mine: "minecraftMined",
  craft: "minecraftCrafted",
  sauts: "minecraft:jump",
  reproduction: "minecraft:animals_bred",
  peche: "minecraft:fish_caught",
  enchantements: "minecraft:enchant_item",
  kills: "minecraft:player_kills",
  raids: "minecraft:raid_win",
  trades: "minecraft:traded_with_villager",
  distance: "minecraftDistance",
};
const description = Object.keys(statTable).join(", ");
module.exports = {
  name: "stat",
  description: "fait un classement par statistiques des joueurs",
  options: [
    {
      type: "string",
      name: "stat",
      description:
        description.length <= 100
          ? description
          : description.slice(0, 97) + "...",
      required: true,
    },
  ],
  async run(bot, interaction, args) {
    interaction.deferReply().then(async () => {
      const WORLD = process.env.PATH_TO_WORLD;
      let stat = args.get("stat").value;
      const statsvalues = { title: stat, values: [], sort: "desc" };
      if (["mort", "dégats reçus"].includes(stat)) {
        statsvalues.sort = "asc";
      }

      const getUserbyFile = async (files) => {
        const userTable = {};

        const fetchPromises = files.map((file) => {
          const uuid = file.replace(".json", "");
          return fetch(`https://playerdb.co/api/player/minecraft/${uuid}`)
            .then((res) => res.json())
            .then((json) => {
              userTable[uuid] = json.data.player.username;
            })
            .catch((err) => {
              console.log(err);
            });
        });

        await Promise.all(fetchPromises);

        return userTable;
      };

      const valueOrZero = (value) => {
        if (value === undefined) {
          return 0;
        }
        return value;
      };

      const readStatsFiles = async (users) => {
        const promises = Object.keys(users).map((key) => {
          return new Promise((resolve, reject) => {
            fs.readFile(`${WORLD}/stats/${key}.json`, "utf8", (err, data) => {
              if (err) {
                console.error("Error reading the file:", err);
                reject(err);
                return;
              }
              try {
                const jsonData = JSON.parse(data);
                if (stat === "distance") {
                  statsvalues.values.push({
                    username: users[key],
                    value: Math.round(
                      (valueOrZero(
                        jsonData.stats["minecraft:custom"][
                          "minecraft:climb_one_cm"
                        ]
                      ) +
                        valueOrZero(
                          jsonData.stats["minecraft:custom"][
                            "minecraft:crouch_one_cm"
                          ]
                        ) +
                        valueOrZero(
                          jsonData.stats["minecraft:custom"][
                            "minecraft:fly_one_cm"
                          ]
                        ) +
                        valueOrZero(
                          jsonData.stats["minecraft:custom"][
                            "minecraft:sprint_one_cm"
                          ]
                        ) +
                        valueOrZero(
                          jsonData.stats["minecraft:custom"][
                            "minecraft:swim_one_cm"
                          ]
                        ) +
                        valueOrZero(
                          jsonData.stats["minecraft:custom"][
                            "minecraft:walk_one_cm"
                          ]
                        ) +
                        valueOrZero(
                          jsonData.stats["minecraft:custom"][
                            "minecraft:walk_on_water_one_cm"
                          ]
                        ) +
                        valueOrZero(
                          jsonData.stats["minecraft:custom"][
                            "minecraft:walk_under_water_one_cm"
                          ]
                        ) +
                        valueOrZero(
                          jsonData.stats["minecraft:custom"][
                            "minecraft:boat_one_cm"
                          ]
                        ) +
                        valueOrZero(
                          jsonData.stats["minecraft:custom"][
                            "minecraft:aviate_one_cm"
                          ]
                        ) +
                        valueOrZero(
                          jsonData.stats["minecraft:custom"][
                            "minecraft:horse_one_cm"
                          ]
                        ) +
                        valueOrZero(
                          jsonData.stats["minecraft:custom"][
                            "minecraft:minecart_one_cm"
                          ]
                        ) +
                        valueOrZero(
                          jsonData.stats["minecraft:custom"][
                            "minecraft:pig_one_cm"
                          ]
                        ) +
                        valueOrZero(
                          jsonData.stats["minecraft:custom"][
                            "minecraft:strider_one_cm"
                          ]
                        )) /
                        100
                    ),
                  });
                } else if (stat === "mine") {
                  let mined = 0;
                  Object.values(jsonData.stats["minecraft:mined"]).forEach(
                    (value) => {
                      mined += valueOrZero(value);
                    }
                  ),
                    statsvalues.values.push({
                      username: users[key],
                      value: mined,
                    });
                } else if (stat === "craft") {
                  let crafted = 0;
                  Object.values(jsonData.stats["minecraft:crafted"]).forEach(
                    (value) => {
                      crafted += valueOrZero(value);
                    }
                  ),
                    statsvalues.values.push({
                      username: users[key],
                      value: crafted,
                    });
                } else if (stat === "time") {
                  statsvalues.values.push({
                    username: users[key],
                    value: Math.round(
                      jsonData.stats["minecraft:custom"][statTable[stat]] /
                        20 /
                        3600,
                      3
                    ),
                  });
                } else if (Object.keys(statTable).includes(stat)) {
                  statsvalues.values.push({
                    username: users[key],
                    value: valueOrZero(
                      jsonData.stats["minecraft:custom"][statTable[stat]]
                    ),
                  });
                } else {
                  reject("stat not found");
                }
                resolve();
              } catch (error) {
                console.error("Error parsing JSON:", error);
                reject(error);
              }
            });
          });
        });

        try {
          await Promise.all(promises);
          // Any code that depends on the completion of the readFile operations
        } catch (error) {
          throw new Error(error);
          // console.error("An error occurred during file reading:", error);
        }
      };
      fs.readdir(`${WORLD}/stats`, async (err, files) => {
        if (err) {
          console.error("Error reading the directory:", err);
          interaction.editReply("Dossier Introuvable").then(() => {
            setTimeout(() => {
              interaction.deleteReply();
            }, 2000);
          });
          return;
        }

        // Check the files in the directory
        //   console.log(files);

        //   console.log(await getUserbyFile(files));
        const allUsers = await getUserbyFile(files);

        readStatsFiles(allUsers)
          .then(() => {
            interaction.editReply(statMessage(statsvalues));
          })
          .catch((err) => {
            console.error(err);
            interaction.editReply("Stat Non trouvée").then(() => {
              setTimeout(() => {
                interaction.deleteReply();
              }, 2000);
            });
          });
      });
    });
  },
};
