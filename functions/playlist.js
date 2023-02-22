const fetch = require("isomorphic-unfetch");
const { getTracks } = require("spotify-url-info")(fetch);

module.exports = async function playlist(queue, playlist, interaction) {
  await queue.playlist(playlist).catch((err) => {
    getTracks(playlist)
      .then((data) => {
        data.map(
          async (track) =>
            await queue.play(`${track.artist} ${track.name}`).catch(err)
        );
      })
      .catch((err) => {
        interaction.editReply(`${err}`);
      });
  });
};
