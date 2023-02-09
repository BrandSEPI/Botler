// VARIABLES,CONSTANTES AND MODULES IMPORTATION
const logger = require("./components/logger");
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
const { Player } = require("discord-music-player");
const { throws } = require("assert");
let mainMessage;
let queue;
let showQueue = false;

//INITIALISATION BOT

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

//INITIALISATION PLAYER
const player = new Player(client, {
  leaveOnEmpty: true,
  leaveOnStop: true,
});

// CONNECTION
client.player = player;

//BOT STATUS READY EVENT HANDLER
client.on("ready", () => {
  try {
    client.user.setActivity("des puceaux parler", {
      type: ActivityType.Listening,
    });
    if (
      typeof json.channelId == "undefined" ||
      typeof json.messageId == "undefined" ||
      json.channelId == "" ||
      json.messageId == ""
    )
      throw Error(
        `init the bot with the ${process.env.PREFIX}init in the channel`
      );
    client.channels.cache
      .get(json.channelId)
      .messages.fetch(json.messageId)
      .then((response) => {
        mainMessage = response;
      })
      .catch((error) => {
        logger.error({
          message: `${error}\nThe Bot was incorrectly init or the data.json got bad data`,
        });
      });
    logger.info({
      message: `Logged in as ${client.user.tag}`,
    });
  } catch (error) {
    logger.error({
      message: `${error}\nThe Bot was incorrectly init or the data.json got bad data`,
    });
  }
  console.log(`Logged in as ${client.user.tag}`);
});

// MESSAGE EVENT HANDLER
client.on("messageCreate", async (message) => {
  try {
    const args = message.content
      .slice(process.env.PREFIX.length)
      .trim()
      .split(/ +/g);
    const command = args.shift();
    guildQueue = client.player.getQueue(message.guild.id);

    //PING COMMAND
    if (command === "ping") {
      try {
        logger.info({
          message: `${message.author.username}: send Ping`,
        });
        message.reply(`pong : ${client.ws.ping} ms`).then((reply) => {
          setTimeout(() => {
            message.delete();
            reply.delete();
          }, 2000);
        });
      } catch (error) {
        logger.error({
          message: `${error}`,
        });
      }
    }
    //INIT COMMAND
    else if (command === "init") {
      try {
        logger.info({
          message: `${message.author.username}: send Init`,
        });
        let newData = { channelId: message.channelId };
        fs.writeFile("data.json", JSON.stringify(newData), function (err) {
          if (err) throw err;
        });
        message.channel.setTopic(
          `utilise ${process.env.PREFIX}play < Your song > pour ajouter une musique a la queue.\nLes bouttons sont utilisables`
        );
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
        logger.error({
          message: `${error}`,
        });
      }
    }
    // THE FOLLOWING COMMANDS ARE DISABLED BECAUSE THEIR ARE USELESS AND JUST FOR FEATURES DEVELOPPEMENTS
    //
    // //SKIP COMMAND
    // else if (command === "skip") {
    //   try {
    //     guildQueue.skip();
    //     if (typeof client.player.getQueue(message.guild.id) !== "undefined")
    //       updatePlayer(client.player.getQueue(message.guild.id).nowPlaying);
    //     message.delete();
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // //NOWPLAYING COMMAND
    // else if (command === "nowPlaying") {
    //   console.log(`Now playing: ${guildQueue.nowPlaying}`);
    //   message.delete();
    // }
    //
    //PLAY COMMAND
    else if (command === "play") {
      try {
        logger.info({
          message: `${message.author.username}: send play ${args}`,
        });
        queue = client.player.createQueue(message.guild.id);
        await queue.join(message.member.voice.channel);
        await queue.play(args.join(" ")).catch((err) => {
          logger.error({
            message: `${err}`,
          });
          if (!guildQueue) queue.stop();
        });
        updatePlayer(queue);
        message.delete();
      } catch (error) {
        logger.error({
          message: `${error}`,
        });
      }
    }
    //BAD COMMAND
    else if (command != "" && message.author.id != client.user.id) {
      try {
        logger.info({
          message: `${message.author.username}: send bad command`,
        });
        message
          .reply({
            content: "```erreur 404Billy ma gueule ```",
            ephemeral: true,
          })
          .then((reply) => {
            setTimeout(() => {
              message.delete();
              reply.delete();
            }, 2500);
          });
      } catch (error) {
        logger.error({
          message: `${error}`,
        });
      }
    }
    //BAD MESSAGE
    else if (
      message.id != json.messageId &&
      message.author.id != client.user.id
    ) {
      logger.info({
        message: `${message.author.username}: send bad message`,
      });
      message.delete();
    }
  } catch (error) {
    logger.error({
      message: `${error}`,
    });
  }
});

//PLAYER EVENT HANDLER
client.player
  .on("songChanged", (queue, newSong, oldSong) => {
    try {
      updatePlayer(queue);
      logger.info({
        message: `Player : song changed`,
      });
    } catch (error) {
      logger.error({
        message: `${error}`,
      });
    }
  })
  .on("queueEnd", () => {
    try {
      updatePlayer("default");
      logger.info({
        message: `Player : end of the queue`,
      });
    } catch (error) {
      logger.error({
        message: `${error}`,
      });
    }
  })
  .on("queueDestroyed", () => {
    try {
      updatePlayer("default");
      logger.info({
        message: `Player : queue destroyed`,
      });
    } catch (error) {
      logger.error({
        message: `${error}`,
      });
    }
  });

//BUTTONS EVENT HANDLER
client.on(Events.InteractionCreate, async (interaction) => {
  try {
    if (!interaction.isButton()) return;
    let queue = client.player.getQueue(interaction.guild.id);
    if (interaction.customId === "play") {
      try {
        logger.info({
          message: `${interaction.user.username} : press ${interaction.customId}`,
        });
        queue.setPaused(false);
      } catch (error) {
        logger.error({
          message: `${error}`,
        });
      }
    }
    if (interaction.customId === "pause") {
      try {
        logger.info({
          message: `${interaction.user.username} : press ${interaction.customId}`,
        });
        queue.setPaused(true);
      } catch (error) {
        logger.error({
          message: `${error}`,
        });
      }
    }
    if (interaction.customId === "stop") {
      try {
        logger.info({
          message: `${interaction.user.username} : press ${interaction.customId}`,
        });
        queue.stop();
      } catch (error) {
        logger.error({
          message: `${error}`,
        });
      }
    }
    if (interaction.customId === "skip") {
      try {
        logger.info({
          message: `${interaction.user.username} : press ${interaction.customId}`,
        });
        queue.skip();
      } catch (error) {
        logger.error({
          message: `${error}`,
        });
      }
    }

    if (interaction.customId === "queue") {
      try {
        logger.info({
          message: `${interaction.user.username} : press ${interaction.customId}`,
        });
        showQueue = !showQueue;
        let data = {
          showQueue: showQueue,
          songs: queue.songs,
        };
        updatePlayer(queue, data);
      } catch (error) {
        logger.error({
          message: `${error}`,
        });
      }
    }
    interaction.deferUpdate();
  } catch (error) {
    logger.error({
      message: `${error}`,
    });
  }
});

//FUNCTION TO UPDATE PLAYER MESSAGE
let updatePlayer = (queue, moreData = {}) => {
  try {
    setTimeout(() => {
      if (typeof mainMessage == "undefined")
        throw new Error("the player message is not defined");
      if (queue == "default") {
        mainMessage.edit(playerMessage("-", {}, {}, 0)).then(() => {});
      } else {
        mainMessage
          .edit(
            playerMessage(
              client.ws.ping,
              queue.nowPlaying,
              moreData,
              queue.songs.length
            )
          )
          .then(() => {});
      }
    }, "1000");
    logger.info({
      message: `updatePlayer function was called`,
    });
  } catch (error) {
    logger.error({
      message: `${error}`,
    });
  }
};

//LOGIN THE BOT TO INTERNET !
client.login(`${process.env.API_KEY}`);
