/* When user speaks in vc*/
receiver.speaking.on("start", (userId) => {
  if (userId !== message.author.id) return;
  console.log(userId);
});
