const fs = require("fs");

// Path to the file you want to edit
const filePath = "node_modules/discord-player/dist/index.js";

// Read the file content
const fileContent = fs.readFileSync(filePath, "utf8");

// Split the file content into an array of lines
const lines = fileContent.split("\n");

// Define the line numbers to remove (e.g., lines 1389 to 1394)
const startLine = 1389;
const endLine = 1394;

// Remove the specified lines from the array
lines.splice(startLine - 1, endLine - startLine + 1);

// Join the remaining lines back into a single string
const modifiedContent = lines.join("\n");

// Write the modified content back to the file
fs.writeFileSync(filePath, modifiedContent, "utf8");
