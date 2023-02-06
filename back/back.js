const express = require("express");
const mongoose = require("mongoose");
const { getMessages, createMessages } = require("./controllers/messages");

const app = express();

mongoose
  .connect(`mongodb://localhost/botler`, {})
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Error...", err);
    process.exit();
  });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.get("/", getMessages);
app.post("/", createMessages);

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
