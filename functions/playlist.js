const fetch = require("isomorphic-unfetch");
const { getData, getPreview, getTracks, getDetails } =
  require("spotify-url-info")(fetch);

module.exports = async function playlist(queue, playlist) {
  await queue.playlist(playlist).catch((err) => {
    getTracks(playlist)
      .then((data) =>
        data.map(
          async (track) => await queue.play(`${track.artist} ${track.name}`)
        )
      )
      .catch((err) => {
        throw new Error(err);
      });
  });
};
