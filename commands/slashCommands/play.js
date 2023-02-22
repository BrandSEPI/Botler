const playlist = require("../../functions/playlist");

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
    let queue = bot.player.createQueue(interaction.guild.id);
    try {
      await queue.join(interaction.member.voice.channel);
    } catch (error) {}
    interaction.deferReply().then(async () => {
      await queue
        .play(song)
        .catch(() => {
          playlist(queue, song, interaction);
          if (!bot.player.getQueue(interaction.guild.id)) queue.stop();
        })
        .then(() => {
          try {
            interaction.editReply(`song added...`).then(() => {
              setTimeout(() => {
                interaction.deleteReply();
              }, 2000);
            });
          } catch (error) {
            throw new Error("Interaction reply failed");
          }
        });
    });
  },
};
