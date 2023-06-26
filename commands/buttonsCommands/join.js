module.exports = {
  name: "join",
  async run(bot, interaction) {
    try {
      console.log(`interaction.guild.id (join): ${interaction.guild.id}`);
    } catch (error) {
      console.log(error);
    }
  },
};
