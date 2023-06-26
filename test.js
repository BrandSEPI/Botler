const fs = require("fs");
const WORLD = "C:/Users/brand/Desktop/server/world";

fs.readdir(`${WORLD}/stats`, async (err, files) => {
  if (err) {
    console.error("Error reading the directory:", err);
    return;
  }

  // Check the files in the directory
  //   console.log(files);
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
  //   console.log(await getUserbyFile(files));

  Object.keys(await getUserbyFile(files)).forEach((key) => {
    fs.readFile(`${WORLD}/stats/${key}.json`, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading the file:", err);
        return;
      }
      try {
        const jsonData = JSON.parse(data);

        
        // Do something with the JSON data
        console.log("JSON data", jsonData, typeof jsonData);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    });
  });

});
