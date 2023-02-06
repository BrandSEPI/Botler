const dotenv = require("dotenv");
dotenv.config();

let isCommand = (message) => {
  return message.content.charAt(0) == process.env.COMMAND_SYMBOL;
};

const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  // console.log(process.env.API_KEY);
});

client.on("messageCreate", (message) => {
  if (!isCommand(message)) return false;
  if (message.content === "µping") {
    message.reply("pong");
  }
});

client.login(`${process.env.API_KEY}`);
