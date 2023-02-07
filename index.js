const dotenv = require("dotenv");
dotenv.config();
const playerMessage = require("./components/playerMessage");
const fs = require("fs");
const ytdl = require("ytdl-core");
let json = require("./data.json");
const { Client, GatewayIntentBits } = require("discord.js");
const discordVoice = require("@discordjs/voice");
const player = discordVoice.createAudioPlayer();

player.on(discordVoice.AudioPlayerStatus.Playing, () => {
  console.log("The audio player has started playing!");
});
// const resource = discordVoice.createAudioResource("./LA_FVE_LA_FOUDRE.mp3", {
//   metadata: {
//     artist: "La Fève",
//     title: "La Foudre",
//   },
// });

let mainMessage;

let lastPing = 0;

dotenv.config();
let isCommand = (message) => {
  return message.content.charAt(0) == process.env.COMMAND_SYMBOL;
};

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

// CONNECTION
client.on("ready", () => {
  client.channels.cache
    .get(json.channelId)
    .messages.fetch(json.messageId)
    .then((response) => {
      mainMessage = response;
    });
  console.log(`Logged in as ${client.user.tag}`);
  if (json.channelId == "")
    console.log("init the bot with the µinit in the channel\n");
});

client.on("messageCreate", (message) => {
  if (!isCommand(message)) return false;
  if (message.content === "µping") {
    message.reply(`pong : ${client.ws.ping}`);
  }
  if (message.content === "µinit") {
    try {
      let newData = { channelId: message.channelId };
      fs.writeFile("data.json", JSON.stringify(newData), function (err) {
        if (err) throw err;
        console.log("complete");
      });
      message.channel.send(playerMessage(lastPing)).then((responseMessage) => {
        let newData = json;
        newData = {
          channelId: message.channelId,
          messageId: responseMessage.id,
          queue: [],
        };

        fs.writeFile("data.json", JSON.stringify(newData), function (err) {
          if (err) throw err;
          console.log("message_id is set");
        });
        message.delete();
      });
    } catch (error) {
      console.log(error);
    }
  }
  if (message.content.indexOf("µplay") >= 0) {
    try {
      let content = message.content.slice(6);
      lastPing = client.ws.ping;
      mainMessage.edit(playerMessage(lastPing));
      const connection = discordVoice.joinVoiceChannel({
        channelId: message.member.voice.channel.id,
        guildId: message.guildId,
        adapterCreator: message.guild.voiceAdapterCreator,
      });
      connection.subscribe(player);
      let newData = json;
      newData.queue.push(content);
      player.play(
        discordVoice.createAudioResource(ytdl(content, { filter: "audioonly" }))
      );

      fs.writeFile("data.json", JSON.stringify(newData), function (err) {
        if (err) throw err;
        console.log("queue Updated with " + message.content.slice(6));
      });
      message.delete();
    } catch (error) {
      console.log(error);
    }
  }
});

client.login(`${process.env.API_KEY}`);
