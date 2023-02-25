const fetch = require("isomorphic-unfetch");
const { getTracks } = require("spotify-url-info")(fetch);

let replaceCarac = (str) => {
  let result = str.replace(/[^a-zA-Z0-9 ]/g, " ");
  return result;
};

module.exports = async function playlist(queue, playlist, interaction) {
  await queue.playlist(playlist).catch((err) => {
    getTracks(playlist)
      .then((data) => {
        data.map(async (track) => {
          try {
            await queue
              .play(replaceCarac(`${track.artist} ${track.name}`))
              .catch(err);
          } catch (error) {
            console.log(
              `${err} on ${replaceCarac(`${track.artist} ${track.name}`)}`
            );
          }
        });
      })
      .catch((err) => {
        interaction.editReply(`${err}`);
      });
  });
};
