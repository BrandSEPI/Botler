// VARIABLES,CONSTANTES AND MODULES IMPORTATION
const dotenv = require("dotenv").config();
const Discord = require("discord.js");
const intents = new Discord.IntentsBitField(3276799);
const loadEvents = require("./loaders/loadEvents");
const { Player } = require("discord-music-player");

//INITIALISATION BOT
const bot = new Discord.Client({ intents });
const player = new Player(bot, {
  leaveOnEmpty: true,
  leaveOnStop: true,
});
bot.player = player;

//LOGIN THE BOT TO INTERNET !
bot.commands = new Discord.Collection();
bot.login(`${process.env.API_KEY}`);
loadEvents(bot);
