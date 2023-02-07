const dotenv = require("dotenv");
dotenv.config();
const playerMessage = require("./components/playerMessage");
const fs = require("fs");
let json = require("./data.json");
const { Client, GatewayIntentBits, Events } = require("discord.js");
const discordVoice = require("@discordjs/voice");
// const player = discordVoice.createAudioPlayer();
const { Player } = require("discord-music-player");
const { throws } = require("assert");

// const resource = discordVoice.createAudioResource("./LA_FVE_LA_FOUDRE.mp3", {
//   metadata: {
//     artist: "La Fève",
//     title: "La Foudre",
//   },
// });

let mainMessage;

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
const player = new Player(client, {
  leaveOnEmpty: false,
});
player.on(discordVoice.AudioPlayerStatus.Playing, () => {
  console.log("The audio player has started playing!");
});
// CONNECTION
client.player = player;
client.on("ready", () => {
  try {
    client.channels.cache
      .get(json.channelId)
      .messages.fetch(json.messageId)
      .then((response) => {
        mainMessage = response;
      });
  } catch (error) {
    console.log(error);
    console.log("init the bot with the µinit in the channel\n");
  }
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  const args = message.content
    .slice(process.env.PREFIX.length)
    .trim()
    .split(/ +/g);
  const command = args.shift();
  let guildQueue = client.player.getQueue(message.guild.id);

  if (command === "ping") {
    message.reply(`pong : ${client.ws.ping}`);
  }
  if (command === "init") {
    try {
      let newData = { channelId: message.channelId };
      fs.writeFile("data.json", JSON.stringify(newData), function (err) {
        if (err) throw err;
        console.log("complete");
      });
      message.channel.send(playerMessage()).then((responseMessage) => {
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
  if (command === "skip") {
    try {
      guildQueue.skip();
      setTimeout(() => {
        if (typeof client.player.getQueue(message.guild.id) !== "undefined")
          updatePlayer(client.player.getQueue(message.guild.id).nowPlaying);
      }, "1000");
      message.delete();
    } catch (error) {
      console.log(error);
    }
  }
  if (command === "nowPlaying") {
    console.log(`Now playing: ${guildQueue.nowPlaying}`);
    message.delete();
  }
  if (command === "play") {
    try {
      let queue = client.player.createQueue(message.guild.id);
      await queue.join(message.member.voice.channel);
      let song = await queue.play(args.join(" ")).catch((err) => {
        console.log(err);
        if (!guildQueue) queue.stop();
      });

      updatePlayer(client.player.getQueue(message.guild.id).nowPlaying);
      message.delete();
    } catch (error) {
      console.log(error);
    }
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isButton()) return;
  if (interaction.customId === "play") {
    console.log("play");
  }
  if (interaction.customId === "pause") {
    console.log("pause");
  }
  if (interaction.customId === "stop") {
    console.log("stop");
  }
  if (interaction.customId === "go") {
    console.log("go");
    let queue = client.player.createQueue(interaction.guild.id);
    await queue.join(interaction.member.voice.channel);
  }
});

let updatePlayer = (newMessageQueue) => {
  try {
    if (typeof mainMessage == "undefined")
      throw new Error("the player message is not defined");
    mainMessage
      .edit(playerMessage(client.ws.ping, newMessageQueue))
      .then(() => {
        console.log("edit");
      });
  } catch (error) {
    console.log(error);
  }
};
client.login(`${process.env.API_KEY}`);
