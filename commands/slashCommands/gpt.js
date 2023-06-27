const avoidMaxLength = require("../../functions/avoidMaxLength");

module.exports = {
  name: "gpt",
  description: "utilise le Generative Pre-trained Transformers pour répondre",
  permission: null,
  dm: true,
  options: [
    {
      type: "string",
      name: "message",
      description: "écris ton message a Botler",
      required: true,
    },
  ],
  async run(bot, interaction, args) {
    let message = args.get("message").value;
    interaction.deferReply().then(async () => {
      console.log(message);
      const chatCompletion = await bot.openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      });
      console.log(chatCompletion.data.choices[0].message);
      avoidMaxLength(
        interaction,
        chatCompletion.data.choices[0].message.content
      );
    });
  },
};
