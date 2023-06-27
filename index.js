// VARIABLES,CONSTANTES AND MODULES IMPORTATION
const dotenv = require("dotenv").config();
const Discord = require("discord.js");
const intents = new Discord.IntentsBitField(3276799);
const loadBotEvents = require("./loaders/loadBotEvents");
const loadPlayerEvents = require("./loaders/loadPlayerEvents");
const { Player } = require("discord-player");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_ACCESS_TOKEN,
});

// Define an async function to wrap the code
async function initializeBot() {
  // INITIALISATION BOT
  const bot = new Discord.Client({ intents });
  bot.openai = new OpenAIApi(configuration);

  const player = new Player(bot, {
    leaveOnEmpty: true,
    leaveOnStop: true,
  });
  // "postinstall": "node ./scripts/editFile.js",

  bot.player = player;

  // LOGIN THE BOT TO INTERNET !
  bot.commands = new Discord.Collection();
  bot.login(`${process.env.API_KEY}`);
  loadBotEvents(bot);
  loadPlayerEvents(bot);

  // Wait for the extractors to load
  await player.extractors.loadDefault();

  // The bot is now fully initialized and ready to use
  console.log("Bot initialized successfully!");
}

// Call the async function immediately
initializeBot().catch((error) => {
  console.error("Error initializing bot:", error);
});
