module.exports = {
  name: "play",
  description: "pour jouer et/ou ajouter le son a la queue",
  permission: null,
  dm: false,
  options: [
    {
      type: "string",
      name: "song",
      description: "nom ou lien de la musique a jouer",
      required: true,
    },
  ],
  async run(bot, interaction, args) {
    let song = args.get("song").value;
    // let queue = bot.player.play(interaction.guild.id);
    // try {
    //   await queue.join(interaction.member.voice.channel);
    // } catch (error) {}
    interaction.deferReply().then(async () => {
      try {
        await bot.player.play(interaction.member.voice.channelId, song);
        // .then(() => {
        //   interaction.editReply(`song added...`).then(() => {
        //     setTimeout(() => {
        //       interaction.deleteReply();
        //     }, 2000);
        //   });
        // });
      } catch (error) {
        console.log(error);
        interaction.editReply(`can't add song : ${error}`).then(() => {
          setTimeout(() => {
            interaction.deleteReply();
          }, 2000);
        });
        // throw new Error("Interaction reply failed");
      }
    });
  },
};
