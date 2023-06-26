const { EndBehaviorType, VoiceReceiver } = require("@discordjs/voice");
const { User } = require("discord.js");
const { createWriteStream } = require("fs");
const prism = require("prism-media");
const { pipeline } = require("node:stream");

function getDisplayName(userId, user) {
  return user ? `${user.username}_${user.discriminator}` : userId;
}

module.exports = function createListeningStream(receiver, userId, user) {
  const opusStream = receiver.subscribe(userId, {
    end: {
      behavior: EndBehaviorType.AfterSilence,
      duration: 100,
    },
  });

  const opusEncoder = new prism.opus.Encoder({
    channelCount: 2,
    sampleRate: 48000,
  });
  const filename = `../recordings/${Date.now()}-${getDisplayName(userId)}.ogg`;
  const out = createWriteStream(filename, { flags: "w" });
  console.log(`👂 Started recording ${filename}`);

  pipeline(opusStream, opusEncoder, out, (err) => {
    // Perform speech-to-text transcription
    if (err) {
      console.warn(`❌ Error recording file ${filename} - ${err.message}`);
    } else {
      console.log(`✅ Recorded ${filename}`);
    }
  });
};
