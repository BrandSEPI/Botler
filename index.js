const dotenv = require("dotenv");
dotenv.config();
const playerMessage = require("./components/playerMessage");
const fs = require("fs");
let json = require("./data.json");
const {
  Client,
  GatewayIntentBits,
  Events,
  ActivityType,
} = require("discord.js");
const discordVoice = require("@discordjs/voice");
const { Player, RepeatMode } = require("discord-music-player");
let mainMessage;
let queue;
let showQueue = false;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});
const player = new Player(client, {
  leaveOnEmpty: true,
  leaveOnStop: true,
});
player.on(discordVoice.AudioPlayerStatus.Playing, () => {
  console.log("The audio player has started playing!");
});

// CONNECTION
client.player = player;
client.on("ready", () => {
  try {
    client.user.setActivity("des puceaux parler", {
      type: ActivityType.Listening,
    });
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
  guildQueue = client.player.getQueue(message.guild.id);

  if (command === "ping") {
    message.reply(`pong : ${client.ws.ping}`);
  }
  if (command === "init") {
    try {
      let newData = { channelId: message.channelId };
      fs.writeFile("data.json", JSON.stringify(newData), function (err) {
        if (err) throw err;
      });
      message.channel.send(playerMessage()).then((responseMessage) => {
        let newData = json;
        newData = {
          channelId: message.channelId,
          messageId: responseMessage.id,
        };
        mainMessage = responseMessage;
        fs.writeFile("data.json", JSON.stringify(newData), function (err) {
          if (err) throw err;
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
      if (typeof client.player.getQueue(message.guild.id) !== "undefined")
        updatePlayer(client.player.getQueue(message.guild.id).nowPlaying);
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
      queue = client.player.createQueue(message.guild.id);
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
    console.log();
  }
  if (interaction.customId === "pause") {
    console.log("pause");
  }
  if (interaction.customId === "stop") {
    console.log("stop");
    client.player.getQueue(interaction.guild.id).stop();
  }
  if (interaction.customId === "skip") {
    console.log("skip");
    client.player.getQueue(interaction.guild.id).skip();
  }

  if (interaction.customId === "queue") {
    showQueue = !showQueue;
    let data = {
      showQueue: showQueue,
      songs: client.player.getQueue(interaction.guild.id).songs,
    };
    updatePlayer(client.player.getQueue(interaction.guild.id).nowPlaying, data);
  }
});

let updatePlayer = (newMessageQueue = {}, moreData = {}) => {
  try {
    setTimeout(() => {
      if (typeof mainMessage == "undefined")
        throw new Error("the player message is not defined");
      mainMessage
        .edit(playerMessage(client.ws.ping, newMessageQueue, moreData))
        .then(() => {
          console.log("edit");
        });
    }, "1000");
  } catch (error) {
    console.log(error);
  }
};

client.login(`${process.env.API_KEY}`);
