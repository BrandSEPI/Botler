const { joinVoiceChannel } = require("@discordjs/voice");
const fs = require("fs");
const prism = require("prism-media");
const { pipeline } = require("stream");


module.exports = {
  name: "leave",
  description:
    "quitte le canal vocal et supprime le fichier audio",
  permission: null,
  dm: false,
  options: [],
  async run(bot, interaction) {
    const member = interaction.member;

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

        // Call the transcriptionDevice function
        transcriptionDevice(userID, connection, talkingUser, time);

        connection.on("connecting", async () => {
          console.log("Connecting to voice channel...");
          interaction.editReply("voice channel connected");
          try {
            console.log("Conversion completed successfully.");
          } catch (error) {
            console.error("Conversion failed:", error);
          }
        });
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

  const filename = `./live_records/${talkingUser}_${time}.pcm`;
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
