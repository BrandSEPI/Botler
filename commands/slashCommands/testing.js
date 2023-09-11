const { joinVoiceChannel } = require("@discordjs/voice");
const wav = require("wav");
const prism = require("prism-media");

module.exports = {
  name: "testing",
  description: "Join a voice channel and continuously record audio",
  permission: null,
  dm: false,
  options: [],
  async run(bot, interaction, args) {
    const member = interaction.member;
    const recordingTimeout = 5000;

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

      const audioChunks = [];
      const opusDecoder = new prism.opus.Decoder({ channels: 2, rate: 48000 });

      const listenStream = connection.receiver.subscribe(voiceChannel.guild.id);
      listenStream.on("data", (data) => {
        const opusFrame = opusDecoder.decode(data);
        audioChunks.push(opusFrame);
      });

      // Optionally, you can set a timeout or condition to stop recording
      // For example, stop after 10 minutes (600,000 milliseconds)

      setTimeout(async () => {
        listenStream.unsubscribe();
        connection.destroy();

        const audioFilePath = await processAndSaveAudio(audioChunks);
        await interaction.reply({ files: [audioFilePath] });
      }, recordingTimeout);
    } catch (error) {
      console.error(error);
      await interaction.reply(
        "Une erreur est survenue lors de l'enregistrement."
      );
    }
  },
};

async function processAndSaveAudio(audioChunks) {
  const audioFilePath = "recorded_audio.wav";
  const wavFile = new wav.FileWriter(audioFilePath, {
    channels: 2, // Stereo audio
    sampleRate: 48000, // Sample rate (adjust as needed)
    bitDepth: 16, // Bit depth (16 bits for PCM)
  });

  for (const chunk of audioChunks) {
    wavFile.write(chunk);
  }

  wavFile.end();

  return new Promise((resolve) => {
    resolve(audioFilePath);
  });
}
