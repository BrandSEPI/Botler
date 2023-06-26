const {
  entersState,
  joinVoiceChannel,
  VoiceConnectionStatus,
  EndBehaviorType,
} = require("@discordjs/voice");
const createListeningStream = require("../../functions/createListeningStream");

module.exports = {
  name: "record",
  description:
    "Makes the bot join the voice channel, record 10 seconds of audio, and save it as a recording",
  async run(bot, interaction) {
    interaction.deferReply().then(async () => {
      console.log(interaction.member.voice.channel);
      const connection = joinVoiceChannel({
        channelId: interaction.member.voice.channelId,
        guildId: interaction.member.voice.channel.guild.id,
        selfDeaf: false,
        selfMute: false,
        adapterCreator:
          interaction.member.voice.channel.guild.voiceAdapterCreator,
      });
      try {
        await entersState(connection, VoiceConnectionStatus.Ready, 20e3);
        const receiver = connection.receiver;

        console.log(receiver);
        receiver.speaking.on("start", (userId) => {
          createListeningStream(receiver, userId, bot.users.cache.get(userId));
        });

        interaction.followUp(`🎙️ I am now recording`);
      } catch (error) {
        console.error(error);
        interaction.followUp(
          "Failed to join the voice channel and start recording. Please try again later."
        );
      }
    });
  },
};
