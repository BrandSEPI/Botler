const updatePlayer = require("../../components/playerMessage");
const playlist = require("../../functions/playlist");

module.exports = {
  name: "test",
  description: "pour tester",
  permission: null,
  dm: true,
  options: [
    {
      type: "string",
      name: "test_1",
      description: "pour tester",
      required: false,
    },
  ],
  async run(bot, interaction, args) {},
};
