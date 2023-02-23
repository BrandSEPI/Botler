const { EmbedBuilder } = require("discord.js");

let messageStructure = (messageContent) => {
  return new EmbedBuilder()
    .setColor(0x00ff00)
    .setTitle("Queue:")
    .setDescription(messageContent);
  // .setImage(songPicture(songData))
  // .setFooter({
  //   text: `Remain ${queueLength(queue)} song${
  //     queueLength(queue) > 1 ? "s" : ""
  //   }\n for a duration of: ${queueDuration(queue)}\n\nLatency: ${ping} ms`,
  // });
};

module.exports = {
  name: "queue",
  async run(bot, interaction) {
    try {
      const channel = bot.channels.cache.get(interaction.channelId);
      let queue = bot.player.getQueue(interaction.guild.id);
      let messageContent = "";
      let moreSongs = 0;
      queue.songs.map((song, i) => {
        let result = `
        ${i + 1}. ${song.name} [${song.duration}]\n`;
        if (messageContent.length + result.length <= 370 && moreSongs == 0) {
          messageContent += result;
        } else {
          moreSongs++;
        }
      });
      messageContent += `and ${moreSongs} more songs...`;
      channel
        .send({ ephemeral: true, embeds: [messageStructure(messageContent)] })
        .then((msg) => {
          setTimeout(() => msg.delete(), 15000);
        });
      // queue.stop();
      // interaction.reply("Queue command");
      // bot.send("Queue command", interaction);
    } catch (error) {
      console.log(error);
    }
  },
};
