module.exports = {
  name: "leave",
  async run(bot, interaction) {
    try {
      console.log(`interaction.guild.id (leave): ${interaction.guild.id}`);
    } catch (error) {
      console.log(error);
    }
  },
};
