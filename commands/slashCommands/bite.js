module.exports = {
  name: "bite",
  description: "bite le message précédent",
  async run(bot, interaction) {
    interaction.deferReply().then(async () => {
      console.log(interaction.member.user);

      doDelete = false;
      let channel = bot.channels.cache.get(interaction.channelId);
      channel.messages.fetch({ limit: 2 }).then((messages) => {
        messages.map((message) => {
          if (message.content === "") {
            console.log("in:", message.content);
            doDelete = true;
          } else {
            console.log("out:", message.content);
            doDelete = false;
            message.react("👉");
            message.react("👌");
            interaction.editReply(
              `${interaction.member.user} à bité : ${message.author}`
            );
          }
        });
        if (doDelete)
          setTimeout(() => {
            if (doDelete) interaction.deleteReply();
          }, 2000);
      });
      //   const connection = joinVoiceChannel({
      //     channelId: interaction.channel.id,
      //     guildId: interaction.channel.guild.id,
      //     selfDeaf: false,
      //     selfMute: true,
      //     adapterCreator: interaction.channel.guild.voiceAdapterCreator,
      //   });
      //   console.log(connection);

      console.log("test:", interaction.channelId);
    });
  },
};
