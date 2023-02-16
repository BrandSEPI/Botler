// VARIABLES,CONSTANTES AND MODULES IMPORTATION
const dotenv = require("dotenv").config();
const Discord = require("discord.js");
const intents = new Discord.IntentsBitField(3276799);
const loadEvents = require("./loaders/loadEvents");
//INITIALISATION BOT
const bot = new Discord.Client({ intents });

//LOGIN THE BOT TO INTERNET !
bot.commands = new Discord.Collection();
bot.login(`${process.env.API_KEY}`);
loadEvents(bot);
