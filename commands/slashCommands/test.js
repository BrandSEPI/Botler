const updatePlayer = require("../../components/playerMessage");
const playlist = require("../../functions/playlist");

module.exports = {
  name: "test",
  description: "pour teste",
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
    await queue.join(interaction.member.voice.channel);
    await queue.play(song).catch((err) => {
      playlist(queue, song, interaction);
      if (!bot.player.getQueue(interaction.guild.id)) queue.stop();
    });

    updatePlayer(queue);
    interaction.reply(`song added...`).then((reply) => {
      setTimeout(() => {
        // reply.user.bot;
        interaction.deleteReply();
      }, 2000);
    });
  },
};
