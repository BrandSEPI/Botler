const { joinVoiceChannel } = require("@discordjs/voice");
const fs = require("fs");
const prism = require("prism-media");
const { pipeline } = require("stream");
const { exec } = require("child_process");
module.exports = {
  name: "record",
  description: "Join a voice channel and continuously record audio",
  permission: null,
  dm: false,
  options: [],
  async run(bot, interaction, args) {
    const member = interaction.member;
    const recordingTimeout = 5000;

    interaction.deferReply().then(async () => {
      if (!member.voice.channel) {
        await interaction.reply(
          "Rejoindre un canal vocal pour utiliser cette commande."
        );
        return;
      }

      const voiceChannel = member.voice.channel;

      try {
        const connection = joinVoiceChannel({
          channelId: voiceChannel.id,
          guildId: voiceChannel.guildId,
          adapterCreator: voiceChannel.guild.voiceAdapterCreator,
          selfDeaf: false,
        });

        // Define the user ID of the person you want to transcribe
        const userID = member.id;
        // Get the user's display name for filename
        const talkingUser = member.displayName;

        // Define a timestamp for the filename (optional)
        const time = Date.now();

        const filenamePCM = `./recordings/${talkingUser}_${time}.pcm`;
        const filenameMP3 = `./recordings/${talkingUser}_${time}.mp3`;

        // Call the transcriptionDevice function
        transcriptionDevice(userID, connection, talkingUser, time);

        // Optionally, you can set a timeout or condition to stop recording
        // For example, stop after 10// Import ffmpeg-static minutes (600,000 milliseconds)

        setTimeout(async () => {
          try {
            await convertPCMToMP3(connection, filenamePCM, filenameMP3);
            console.log("Conversion completed successfully.");
          } catch (error) {
            console.error("Conversion failed:", error);
          }
          // await interaction.editReply("Enregistrement terminé.", {
          //   files: [filenameMP3],
          // });
          // const embed = new Discord.MessageEmbed().setTitle("Attachments");
          // await interaction.editReply({
          //   embeds: [embed],
          //   files: [filenameMP3],
          // });
          // fs.rm(filenameMP3);
        }, recordingTimeout);
      } catch (error) {
        console.error(error);
        await interaction.editReply(
          "Une erreur est survenue lors de l'enregistrement."
        );
      }
    });
  },
};

function transcriptionDevice(userID, voiceConn, talkingUser, time) {
  console.log("1. Start speaking event triggered");

  const audioReceiveStream = voiceConn.receiver
    .subscribe(userID)
    .on("error", (error) => {
      console.log("audioReceiveStream error: ", error);
    });

  const filename = `./recordings/${talkingUser}_${time}.pcm`;
  const out = fs.createWriteStream(filename);
  // Create a decoder to decode the Opus audio data into PCM
  const opusDecoder = new prism.opus.Decoder({
    frameSize: 960,
    channels: 2,
    rate: 48000,
  });

  // Let's add some logging to the stream to make sure data is flowing
  const logStream = new (require("stream").Transform)({
    transform(chunk, encoding, callback) {
      // console.log(`Received ${chunk.length} bytes of data.`);
      callback(null, chunk);
    },
  });
  pipeline(audioReceiveStream, opusDecoder, logStream, out, (err) => {
    if (err) {
      console.error("Pipeline failed.", err);
    } else {
      console.log("Pipeline succeeded.");
    }
  });
}

function convertPCMToMP3(connection, inputFileName, outputFileName) {
  return new Promise((resolve, reject) => {
    // Construct the FFmpeg command
    connection.destroy();
    const command = `ffmpeg -f s16le -i ${inputFileName} -acodec libmp3lame ${outputFileName}`;

    // Execute the command
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error("Error:", error);
        reject(error);
      } else {
        console.log("Conversion finished.");
        resolve();
      }
    });
    // fs.rm(inputFileName);
  });
}
