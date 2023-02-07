const dotenv = require("dotenv");
const fs = require("fs");
let json = require("./data.json");
const {
  Client,
  GatewayIntentBits,
  ButtonStyle,
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");

const file = new AttachmentBuilder("./piwoPlayer.png");
let channel;

dotenv.config();
let isCommand = (message) => {
  return message.content.charAt(0) == process.env.COMMAND_SYMBOL;
};

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

let btnInformation = {
  play: ["▶", ButtonStyle.Success],
  pause: ["||", ButtonStyle.Secondary],
  stop: ["∎", ButtonStyle.Secondary],
};
let btn = (btnInformation, index) => {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(index)
      .setLabel(btnInformation[index][0])
      .setStyle(btnInformation[index][1])
  );
};

const player = new EmbedBuilder()
  .setColor(0x00ff00)
  .setTitle("BOTLER:PIWO player")
  .setDescription("Best Discord media player by PiwoGang")

  .setImage("attachment://piwoPlayer.png");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  if (json.channelId == "")
    console.log("init the bot with the µinit in the channel\n");
  else {
    channel = client.channels.cache.find(
      (channel) => channel.id === json.channelId
    );
    channel.messages.fetch().then((message) => {
      console.log(message.delete());
      // if(messageconten)
      //   message
      //     .delete()
      //     .then((msg) =>
      //       console.log(`Deleted message from ${msg.author.username}`)
      //     )
      //     .catch(console.error);
    });

    channel.send({
      embeds: [player],
      components: [
        btn(btnInformation, "play"),
        btn(btnInformation, "pause"),
        btn(btnInformation, "stop"),
      ],
      files: [file],
      inline: true,
    });
  }
});

client.on("messageCreate", (message) => {
  if (!isCommand(message)) return false;
  if (message.content === "µping") {
    message.reply("pong");
  }
  if (message.content === "µinit") {
    let newData = { channelId: message.channelId };
    fs.writeFile("data.json", JSON.stringify(newData), function (err) {
      if (err) throw err;
      console.log("complete");
    });
    message.reply("channelId Saved");
  }
  if (message.content.indexOf("µplay") >= 0) {
    console.log("test");
    console.log(message.content.slice(5, -1));
    // message.content.slice()
    // json.push()
    // let newData = { channelId: message.channelId };
    // fs.writeFile("data.json", JSON.stringify(newData), function (err) {
    //   if (err) throw err;
    //   console.log("complete");
    // });
    // message.reply("channelId Saved");
  }
});

client.login(`${process.env.API_KEY}`);
