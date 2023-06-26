const fs = require("fs");

module.exports = {
  name: "test",
  description: "test",
  async run(bot, interaction) {
    interaction.deferReply().then(async () => {
      const WORLD = process.env.PATH_TO_WORLD;

      fs.readdir(`${WORLD}/stats`, (err, files) => {
        if (err) {
          console.error("Error reading the directory:", err);
          return;
        }

        // Check the files in the directory
        console.log(files);

        // Find the JSON file
        const jsonFile = files.find((file) => file.endsWith(".json"));
        if (!jsonFile) {
          console.error("No JSON file found in the directory");
          return;
        }

        // Read the JSON file
        fs.readFile(`${WORLD}/stats/${jsonFile}`, "utf8", (err, data) => {
          if (err) {
            console.error("Error reading the file:", err);
            return;
          }

          try {
            console.log("files", jsonFile);
            const jsonData = JSON.parse(data);
            // Do something with the JSON data
            console.log("JSON data", jsonData, typeof jsonData);
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        });
      });
      console.log("test:", interaction.channelId);
    });
  },
};
